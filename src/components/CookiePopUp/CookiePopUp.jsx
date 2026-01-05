import { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faTimes } from '@fortawesome/free-solid-svg-icons';
import './CookiePopUp.css';

const CookiePopUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('txl_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('txl_cookie_consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('txl_cookie_consent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent-overlay">
            <div className="cookie-consent-card">
                <div className="cookie-icon-wrapper">
                    <FontAwesomeIcon icon={faCookieBite} className="cookie-icon" />
                </div>
                <div className="cookie-content">
                    <h5 className="fw-bold text-dark-teal mb-2">Un petit cookie ? 🍪</h5>
                    <p className="text-muted small mb-0">
                        Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic.
                        C'est promis, ils sont sans calories !
                    </p>
                </div>
                <div className="cookie-actions">
                    <Button variant="link" className="text-muted btn-sm text-decoration-none me-2" onClick={handleDecline}>
                        Non merci
                    </Button>
                    <Button variant="dark-teal" className="btn-sm rounded-pill px-4" onClick={handleAccept}>
                        J'accepte
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CookiePopUp;
