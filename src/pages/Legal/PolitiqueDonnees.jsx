import { Container } from 'react-bootstrap';
import './Legal.css';

function PolitiqueDonnees() {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <Container className="text-center">
                    <h1 className="legal-hero-title">
                        Protection des <span className="text-teal-light">Données</span>
                    </h1>
                </Container>
            </section>

            <section className="legal-content">
                <Container>
                    <div className="legal-card">
                        <h2>Responsable du traitement</h2>
                        <p>
                            TXL Formation, projet étudiant de l'Université Gustave Eiffel, est responsable du traitement 
                            des données personnelles collectées sur ce site.
                        </p>

                        <h2>Données collectées</h2>
                        <p>Nous collectons les données suivantes :</p>
                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse email</li>
                            <li>Numéro de téléphone (optionnel)</li>
                            <li>Adresse postale</li>
                            <li>Informations de connexion (identifiant)</li>
                        </ul>

                        <h2>Finalités du traitement</h2>
                        <p>Vos données sont utilisées pour :</p>
                        <ul>
                            <li>Gérer votre compte utilisateur</li>
                            <li>Traiter vos inscriptions aux formations</li>
                            <li>Vous contacter concernant vos formations</li>
                            <li>Établir les certificats de formation</li>
                        </ul>

                        <h2>Durée de conservation</h2>
                        <p>
                            Vos données sont conservées pendant toute la durée de votre inscription, puis archivées 
                            pendant 3 ans après votre dernière activité, conformément aux obligations légales.
                        </p>

                        <h2>Vos droits</h2>
                        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                        <ul>
                            <li>Droit d'accès à vos données</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l'effacement</li>
                            <li>Droit à la portabilité</li>
                            <li>Droit d'opposition</li>
                        </ul>
                        <p>
                            Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@txlforma.fr">contact@txlforma.fr</a>
                        </p>

                        <h2>Sécurité</h2>
                        <p>
                            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : 
                            chiffrement des mots de passe, connexions sécurisées HTTPS, accès restreint aux données.
                        </p>

                        <p className="legal-update">Dernière mise à jour : Janvier 2026</p>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default PolitiqueDonnees;
