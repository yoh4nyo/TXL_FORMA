import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faEye } from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from 'jspdf';

function VueCertificats({ certificats, utilisateur }) {
  const loadImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const handleDownload = async (cert) => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const primary = { r: 14, g: 85, b: 85 };
    const accent = { r: 214, g: 172, b: 52 };
    const deep = { r: 25, g: 32, b: 48 };
    const studentName = `${utilisateur?.prenom || ''} ${utilisateur?.nom || ''}`.trim() || 'Élève';
    const today = new Date().toLocaleDateString('fr-FR');
    const margin = 64;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFont('helvetica', 'normal');

    doc.setDrawColor(accent.r, accent.g, accent.b);
    doc.setLineWidth(3);
    doc.roundedRect(margin / 2, margin / 2, pageWidth - margin, pageHeight - margin, 20, 20, 'S');

    doc.setDrawColor(primary.r, primary.g, primary.b);
    doc.setLineWidth(1.2);
    doc.roundedRect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2, 12, 12, 'S');

    try {
      const logoUrl = `${window.location.origin}/assets/txlformatvert.png`;
      const logoImg = await loadImage(logoUrl);
      const logoWidth = 80;
      const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
      doc.addImage(logoImg, 'PNG', margin + 8, margin - 4, logoWidth, logoHeight);
    } catch (e) {
    }
    doc.setTextColor(deep.r, deep.g, deep.b);
    doc.setFontSize(12);
    doc.text('MINISTERE DE L"EDUCATION', pageWidth / 2, margin + 30, { align: 'center' });

    doc.setFontSize(30);
    doc.text('CERTIFICAT', pageWidth / 2, margin + 80, { align: 'center' });
    doc.setFontSize(18);
    doc.setTextColor(primary.r, primary.g, primary.b);
    doc.text(cert.typeCertificat.toUpperCase(), pageWidth / 2, margin + 110, { align: 'center' });

    const bodyTop = margin + 170;
    doc.setTextColor(deep.r, deep.g, deep.b);
    doc.setFontSize(13);
    doc.text('Le présent certificat est attribué à :', margin + 20, bodyTop);

    doc.setFontSize(24);
    doc.text(studentName, pageWidth / 2, bodyTop + 40, { align: 'center' });

    doc.setFontSize(13);
    const message = cert.typeCertificat === 'Certificat de Réussite'
      ? `pour avoir validé avec succès la formation "${cert.formation}" avec une note de ${cert.note}/20.`
      : `pour avoir suivi avec assiduité la formation "${cert.formation}".`;
    doc.text(message, pageWidth / 2, bodyTop + 70, { align: 'center', maxWidth: pageWidth - margin * 2 - 40 });

    const detailsY = bodyTop + 120;
    doc.setFontSize(12);
    doc.text(`Formateur : ${cert.formateur || '-'}`, margin + 20, detailsY);
    doc.text(`Date d'obtention : ${cert.dateObtention || '-'}`, margin + 20, detailsY + 20);
    doc.text(`Émis le : ${today}`, margin + 20, detailsY + 40);

    const signY = pageHeight - margin - 80;
    doc.setDrawColor(primary.r, primary.g, primary.b);
    doc.line(margin + 20, signY, margin + 200, signY);
    doc.setFontSize(11);
    doc.text('Signature et cachet de l’établissement', margin + 20, signY + 16);
    try {
      const signatureUrls = [
        `${window.location.origin}/assets/signature.png`,
        `${window.location.origin}/assets/signature.PNG`
      ];
      let signatureImg;
      for (const url of signatureUrls) {
        try {
          signatureImg = await loadImage(url);
          if (signatureImg) break;
        } catch (err) {
        }
      }
      if (signatureImg) {
        const sigWidth = 140;
        const sigHeight = (signatureImg.height / signatureImg.width) * sigWidth;
        doc.addImage(signatureImg, 'PNG', margin + 24, signY + 6, sigWidth, sigHeight);
      }
    } catch (e) {
    }
    const sealX = pageWidth - margin - 90;
    const sealY = signY - 10;
    doc.setDrawColor(accent.r, accent.g, accent.b);
    doc.setFillColor(255, 255, 255);
    doc.circle(sealX, sealY, 48, 'S');
    doc.setFillColor(accent.r, accent.g, accent.b);
    doc.circle(sealX, sealY, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text('TXL FORMA', sealX, sealY - 4, { align: 'center' });
    doc.setFontSize(10);
    doc.text('CERTIFICAT', sealX, sealY + 12, { align: 'center' });

    const fileName = `certificat-${cert.formation?.replace(/\s+/g, '-') || 'formation'}-${cert.typeCertificat.replace(/\s+/g, '-')}.pdf`;
    doc.save(fileName.toLowerCase());
  };
  if (!certificats || certificats.length === 0) {
    return (
      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
        <h4 className="fw-bold mb-4 text-dark-teal">
          <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
            <FontAwesomeIcon icon={faAward} style={{ fontSize: '0.9rem' }} />
          </div>
          Mes certificats
        </h4>
        <p className="text-muted text-center py-5">Vous n'avez pas encore de certificat</p>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 mb-5">
      <h4 className="fw-bold mb-4 text-dark-teal">
        <div className="icon-box-small d-inline-flex align-items-center justify-content-center me-2 text-white bg-dark-teal rounded-2" style={{ width: 32, height: 32 }}>
          <FontAwesomeIcon icon={faAward} style={{ fontSize: '0.9rem' }} />
        </div>
        Mes certificats
      </h4>

      <Row className="g-4">
        {certificats.map((cert, idx) => (
          <Col lg={6} key={`${cert.id || 'cert'}-${idx}`}>
            <div className="cert-card border rounded-4 p-4 bg-white shadow-sm h-100 d-flex flex-column">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-3 d-flex align-items-center justify-content-center me-3" style={{ width: 48, height: 48, backgroundColor: '#17a2b820', color: '#17a2b8' }}>
                  <FontAwesomeIcon icon={faAward} style={{ fontSize: '1.5rem' }} />
                </div>
                <div>
                  <h6 className="fw-bold mb-1">{cert.formation}</h6>
                  <p className="text-muted extra-small mb-0">{cert.typeCertificat}</p>
                </div>
              </div>

              <div className="bg-light-blue rounded-3 p-3 mb-4 flex-grow-1">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-teal small fw-bold">Note obtenue</span>
                  <span className="small text-muted">{cert.note}/20</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-teal small fw-bold">Date d'obtention</span>
                  <span className="small text-muted">{cert.dateObtention}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-teal small fw-bold">Formateur</span>
                  <span className="small text-muted">{cert.formateur}</span>
                </div>
              </div>

              <Button variant="dark-teal" className="w-100 rounded-3 mt-auto" onClick={() => handleDownload(cert)}>
                <i className="bi bi-download me-2"></i> Télécharger
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
}

export default VueCertificats;
