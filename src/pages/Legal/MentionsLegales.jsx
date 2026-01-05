import { Container } from 'react-bootstrap';
import './Legal.css';

function MentionsLegales() {
    return (
        <div className="legal-page">
            <section className="legal-hero">
                <Container className="text-center">
                    <h1 className="legal-hero-title">
                        Mentions <span className="text-teal-light">Légales</span>
                    </h1>
                </Container>
            </section>

            <section className="legal-content">
                <Container>
                    <div className="legal-card">
                        <h2>Éditeur du site</h2>
                        <p>
                            <strong>TXL Formation</strong><br />
                            Projet étudiant réalisé dans le cadre de la SAE S2<br />
                            Université Gustave Eiffel<br />
                            5 Boulevard Descartes, 77420 Champs-sur-Marne
                        </p>

                        <h2>Responsables de la publication</h2>
                        <p>
                            Yannis, Yohan, Mathias et Alexandre<br />
                            Contact : <a href="mailto:contact@txlforma.fr">contact@txlforma.fr</a>
                        </p>

                        <h2>Hébergement</h2>
                        <p>
                            <strong>Frontend :</strong> Vercel Inc.<br />
                            440 N Barranca Ave #4133, Covina, CA 91723, USA
                        </p>
                        <p>
                            <strong>Backend :</strong> Railway Corporation<br />
                            San Francisco, CA, USA
                        </p>

                        <h2>Propriété intellectuelle</h2>
                        <p>
                            L'ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d'auteur. 
                            Toute reproduction, même partielle, est interdite sans autorisation préalable.
                        </p>

                        <h2>Limitation de responsabilité</h2>
                        <p>
                            Ce site est un projet étudiant à but pédagogique. Les informations fournies le sont à titre indicatif 
                            et ne sauraient engager la responsabilité des auteurs. Les formations présentées sont fictives.
                        </p>

                        <p className="legal-update">Dernière mise à jour : Janvier 2026</p>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default MentionsLegales;
