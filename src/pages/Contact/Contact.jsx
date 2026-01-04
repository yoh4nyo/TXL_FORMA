import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faEnvelope, faQuestionCircle, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import { faFacebook, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message envoyé !\n\nNote : Cette fonctionnalité est uniquement du front-end et n'envoie pas réellement de message.");
    };

    return (
        <div className="contact-page">
            <section className="contact-hero">
                <Container className="text-center text-white h-100 d-flex flex-column justify-content-center align-items-center">
                    <h1 className="contact-hero-title mb-3">
                        Contactez - <span className="text-teal-light">nous</span>
                    </h1>
                    <p className="contact-hero-subtitle">
                        Une question ? Un projet de formation ? Notre équipe est là pour vous accompagner.
                    </p>
                </Container>
            </section>

            <section className="contact-content-section section">
                <Container>
                    <Row className="g-5">
                        <Col lg={7}>
                            <div className="contact-card p-4 p-md-5 bg-white rounded-4 shadow-sm">
                                <div className="d-flex align-items-center mb-4">
                                    <div className="icon-box me-3">
                                        <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                                    </div>
                                    <h2 className="section-title mb-0 text-start">Envoyez nous un message</h2>
                                </div>

                                <Form onSubmit={handleSubmit}>
                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="nom">
                                                <Form.Label className="fw-medium small">Nom <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="text" placeholder="votre Nom" className="form-control-contact" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="email">
                                                <Form.Label className="fw-medium small">Email <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="email" placeholder="votre@email.com" className="form-control-contact" />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row className="g-3">
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="telephone">
                                                <Form.Label className="fw-medium small">Téléphone <span className="text-danger">*</span></Form.Label>
                                                <Form.Control type="tel" placeholder="+33 7 85 64 23 45" className="form-control-contact" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3" controlId="sujet">
                                                <Form.Label className="fw-medium small">Sujet <span className="text-danger">*</span></Form.Label>
                                                <Form.Select className="form-control-contact form-select-contact">
                                                    <option>Sélectionnez un sujet</option>
                                                    <option value="formation">Renseignement Formation</option>
                                                    <option value="devis">Demande de devis</option>
                                                    <option value="support">Support technique</option>
                                                    <option value="autre">Autre</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-4" controlId="message">
                                        <Form.Label className="fw-medium small">Message</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Écrivez votre message..." className="form-control-contact" />
                                    </Form.Group>

                                    <Button className="btn-contact-submit" type="submit">
                                        <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                        Envoyer le message
                                    </Button>
                                </Form>
                            </div>
                        </Col>

                        {/* Colonne droite */}
                        <Col lg={4} className="offset-lg-1">
                            {/* Coordonnées card */}
                            <div className="sidebar-card bg-white rounded-4 shadow-sm p-4 mb-4">
                                <div className="d-flex align-items-center mb-4">
                                    <FontAwesomeIcon icon={faEnvelope} className="sidebar-icon-title me-2 text-teal" />
                                    <h4 className="sidebar-title mb-0">Nos coordonnées</h4>
                                </div>

                                <div className="contact-info-item mb-3">
                                    <h6 className="fw-bold mb-1">Email</h6>
                                    <p className="text-muted small mb-0">txlforma@gmail.com</p>
                                </div>
                                <div className="contact-info-item mb-3">
                                    <h6 className="fw-bold mb-1">Téléphone</h6>
                                    <p className="text-muted small mb-0">+33 1 23 45 67</p>
                                </div>
                                <div className="contact-info-item">
                                    <h6 className="fw-bold mb-1">Adresse</h6>
                                    <p className="text-muted small mb-0">12 Avenue de la Formation Paris 75001 Paris, France</p>
                                </div>
                            </div>

                            <div className="sidebar-card bg-white rounded-4 shadow-sm p-4 mb-4">

                                <div className="d-flex align-items-center mb-4">
                                    <FontAwesomeIcon icon={faQuestionCircle} className="sidebar-icon-title me-2 text-teal" />
                                    <h4 className="sidebar-title mb-0">FAQ</h4>
                                </div>

                                <Accordion defaultActiveKey="0" flush className="contact-accordion">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Combien de temps pour recevoir une réponse ?</Accordion.Header>
                                        <Accordion.Body className="small text-muted">
                                            Nous nous engageons à répondre à toutes les demandes sous 24 à 48 heures ouvrées.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Puis-je vous appeler directement ?</Accordion.Header>
                                        <Accordion.Body className="small text-muted">
                                            Oui, notre standard est ouvert du lundi au vendredi de 9h à 18h au +33 1 23 45 67.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Où trouver plus d'informations ?</Accordion.Header>
                                        <Accordion.Body className="small text-muted">
                                            Vous pouvez consulter notre page 'À propos' ou télécharger notre brochure complète dans la section 'Nos formations'.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                            <div className="sidebar-card bg-white rounded-4 shadow-sm p-4">
                                <div className="d-flex align-items-center mb-4">
                                    <FontAwesomeIcon icon={faMobileAlt} className="sidebar-icon-title me-2 text-teal" />
                                    <h4 className="sidebar-title mb-0">Nos réseaux</h4>
                                </div>

                                <div className="d-flex flex-wrap gap-2">

                                    <Button variant="outline-dark" className="btn-social d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faFacebook} className="text-primary" />
                                        <span className="small">Facebook</span>
                                    </Button>
                                    <Button variant="outline-dark" className="btn-social d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faLinkedin} className="text-primary" />
                                        <span className="small">Linkedin</span>
                                    </Button>
                                    <Button variant="outline-dark" className="btn-social d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faInstagram} className="text-danger" />
                                        <span className="small">Instagram</span>
                                    </Button>
                                    <Button variant="outline-dark" className="btn-social d-flex align-items-center gap-2">
                                        <FontAwesomeIcon icon={faTwitter} className="text-dark" />
                                        <span className="small">Twitter</span>
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
}

export default Contact;
