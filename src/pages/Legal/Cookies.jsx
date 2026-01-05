import { Container } from 'react-bootstrap';
import './Legal.css';

function Cookies() {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <Container className="text-center">
                    <h1 className="legal-hero-title">
                        Politique de <span className="text-teal-light">cookies</span>
                    </h1>
                </Container>
            </section>

            <section className="legal-content">
                <Container>
                    <div className="legal-card">
                        <h2>Qu'est-ce qu'un cookie ?</h2>
                        <p>
                            Un cookie est un petit fichier texte déposé sur votre navigateur lors de la visite d'un site.
                            Il permet de stocker des informations relatives à votre navigation.
                        </p>

                        <h2>Cookies utilisés sur ce site</h2>
                        <p>Nous utilisons uniquement des cookies essentiels au fonctionnement du site :</p>
                        <ul>
                            <li><strong>Cookies de session :</strong> permettent de maintenir votre connexion active</li>
                            <li><strong>Cookies de préférences :</strong> stockent vos préférences d'affichage</li>
                        </ul>

                        <h2>Cookies tiers</h2>
                        <p>
                            Ce site utilise Stripe pour le traitement des paiements. Stripe peut déposer ses propres cookies
                            pour assurer la sécurité des transactions. Pour plus d'informations, consultez la
                            <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer"> politique de confidentialité de Stripe</a>.
                        </p>

                        <h2>Gestion des cookies</h2>
                        <p>
                            Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres
                            de votre navigateur. Attention, la désactivation de certains cookies peut affecter votre
                            expérience de navigation.
                        </p>

                        <h2>Durée de conservation</h2>
                        <p>
                            Les cookies de session sont supprimés à la fermeture du navigateur.
                            Les autres cookies sont conservés pour une durée maximale de 13 mois.
                        </p>

                        <p className="legal-update">Dernière mise à jour : Janvier 2026</p>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Cookies;
