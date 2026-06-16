import PDFDocument from 'pdfkit';
import { IReport } from '../models/report.model';

function formatDate(date: Date): string {
  return date.toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' });
}

import type PDFDocumentType from 'pdfkit';

function addSection(doc: InstanceType<typeof PDFDocumentType>, title: string, body: string): void {
  doc.fontSize(11).fillColor('#111827').text(title, { underline: true });
  doc.moveDown(0.3);
  doc.fontSize(10).fillColor('#374151').text(body || '—', { align: 'left' });
  doc.moveDown(0.8);
}

export function generateReportPdf(report: IReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks: Buffer[] = [];

    doc.on('data', chunk => chunks.push(chunk as Buffer));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(18).fillColor('#0ea5e9').text('NetWatch Pro — Reporte de evento', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).fillColor('#111827').text(report.title, { align: 'center' });
    doc.moveDown(1.2);

    addSection(doc, 'Tipo de evento', report.type);
    addSection(doc, 'Severidad', report.severity);
    addSection(doc, 'Estado', report.status);
    if (report.isoStandard) addSection(doc, 'Estándar ISO', report.isoStandard);
    if (report.dimension) addSection(doc, 'Dimensión (matriz de operacionalización)', report.dimension);
    if (report.controlIso) addSection(doc, 'Control ISO 27001', report.controlIso);
    addSection(doc, 'Fecha de creación', formatDate(report.createdAt));
    addSection(doc, 'Última actualización', formatDate(report.updatedAt));
    addSection(doc, 'VLAN afectada', report.vlanId !== undefined ? String(report.vlanId) : '—');
    addSection(doc, 'Dispositivo (IP)', report.deviceIp ?? '—');
    addSection(doc, 'Dispositivo (MAC)', report.deviceMac ?? '—');
    addSection(doc, 'IP atacante', report.attackerIp ?? '—');
    if (report.activoAfectado) addSection(doc, 'Activo afectado', report.activoAfectado);
    if (report.amenaza) addSection(doc, 'Amenaza', report.amenaza);
    if (report.vulnerabilidad) addSection(doc, 'Vulnerabilidad', report.vulnerabilidad);
    if (report.riesgoNivel) addSection(doc, 'Nivel de riesgo', report.riesgoNivel);
    if (report.impacto !== undefined) addSection(doc, 'Impacto (1-5)', String(report.impacto));
    if (report.probabilidad !== undefined) addSection(doc, 'Probabilidad (1-5)', String(report.probabilidad));
    if (report.tratamiento) addSection(doc, 'Tratamiento de riesgo', report.tratamiento);
    addSection(doc, 'Descripción', report.description);
    addSection(doc, 'Acción tomada', report.actionTaken ?? '—');
    addSection(doc, 'Registrado por', report.createdBy);

    doc.fontSize(11).fillColor('#111827').text('Logs', { underline: true });
    doc.moveDown(0.3);
    if (report.logs?.length) {
      report.logs.forEach((line, i) => {
        doc.fontSize(9).fillColor('#4b5563').text(`${i + 1}. ${line}`);
      });
    } else {
      doc.fontSize(10).text('—');
    }
    doc.moveDown(0.8);

    doc.fontSize(11).fillColor('#111827').text('Evidencia', { underline: true });
    doc.moveDown(0.3);
    if (report.evidence?.length) {
      report.evidence.forEach((item, i) => {
        doc.fontSize(9).fillColor('#4b5563').text(`${i + 1}. ${item}`);
      });
    } else {
      doc.fontSize(10).text('—');
    }

    if (report.evidenciaIso?.length) {
      doc.moveDown(0.8);
      doc.fontSize(11).fillColor('#111827').text('Evidencia ISO / matriz', { underline: true });
      doc.moveDown(0.3);
      report.evidenciaIso.forEach((item, i) => {
        doc.fontSize(9).fillColor('#4b5563').text(`${i + 1}. ${item}`);
      });
    }

    doc.end();
  });
}
