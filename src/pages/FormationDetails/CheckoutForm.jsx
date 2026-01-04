import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { apiClient } from '../../api/client';
import './ModalReservation.css';

const CheckoutForm = ({ sessionId, eleveId, montant, onSuccess, onCancel }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);
        setError(null);

        try {
            const response = await apiClient.post('/inscription/create-payment-intent', {
                amount: montant,
                currency: 'eur'
            });

            const { clientSecret, paymentIntentId } = response;

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                }
            });

            if (stripeError) {
                setError(stripeError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === 'succeeded') {
                await apiClient.post('/inscription/confirm-inscription', {
                    sessionId,
                    eleveId,
                    montant,
                    paymentIntentId
                });

                onSuccess();
            }
        } catch (err) {
            setError(err.message || 'Une erreur est survenue lors du paiement');
            setProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            
            <div className="mb-4">
                <label className="form-label fw-bold text-dark">Informations de carte bancaire</label>
                <div className="card-element-wrapper p-3 border rounded-3">
                    <CardElement options={cardElementOptions} />
                </div>
                <small className="text-muted">Paiement sécurisé via Stripe</small>
            </div>

            <div className="d-flex gap-3 justify-content-end">
                <Button 
                    variant="outline-secondary" 
                    className="px-4 py-2 fw-bold rounded-3"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </Button>
                <Button 
                    type="submit" 
                    variant="dark-teal" 
                    className="px-4 py-2 fw-bold rounded-3 text-white"
                    disabled={!stripe || processing}
                >
                    {processing ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Traitement...
                        </>
                    ) : (
                        `Payer ${montant}€`
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CheckoutForm;
