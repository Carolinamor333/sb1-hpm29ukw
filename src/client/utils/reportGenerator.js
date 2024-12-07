import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Generate Complete Report
export const generateCompleteReport = async (timeRange, category) => {
  // Prepare comprehensive report data
  const reportData = {
    metadata: {
      generatedAt: new Date().toISOString(),
      timeRange,
      category
    },
    metrics: [
      { metric: 'Order Fulfillment Rate', value: '94%', trend: '+2.3%' },
      { metric: 'On-Time Delivery', value: '92%', trend: '+1.5%' },
      { metric: 'Inventory Turnover', value: '12x', trend: '+0.8x' }
    ],
    inventory: [
      { item: 'Product A', stock: 150, reorderPoint: 50, turnover: '4.2x' },
      { item: 'Product B', stock: 75, reorderPoint: 30, turnover: '3.8x' },
      { item: 'Product C', stock: 200, reorderPoint: 100, turnover: '5.1x' }
    ],
    performance: [
      { supplier: 'Supplier X', onTimeDelivery: '95%', quality: '98%', responseTime: '2h' },
      { supplier: 'Supplier Y', onTimeDelivery: '92%', quality: '96%', responseTime: '4h' },
      { supplier: 'Supplier Z', onTimeDelivery: '88%', quality: '94%', responseTime: '6h' }
    ]
  };

  // Generate PDF by default
  await generatePDFReport(reportData, 'Supply Chain Analytics Report');
};

// Generate Excel Report
export const generateExcelReport = async (data, reportName) => {
  const wb = XLSX.utils.book_new();
  
  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Report Data');
  
  // Generate Excel file
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  // Save file
  saveAs(blob, `${reportName}_${formatDate(new Date())}.xlsx`);
};

// Generate PDF Report
export const generatePDFReport = async (data, reportName) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text(reportName, 14, 15);
  
  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated on: ${formatDate(new Date())}`, 14, 25);
  doc.text(`Time Range: ${data.metadata?.timeRange || 'All Time'}`, 14, 32);
  doc.text(`Category: ${data.metadata?.category || 'All Categories'}`, 14, 39);
  
  let yOffset = 50;

  // Add Metrics Section
  if (data.metrics) {
    doc.setFontSize(14);
    doc.text('Key Metrics', 14, yOffset);
    
    doc.autoTable({
      head: [['Metric', 'Value', 'Trend']],
      body: data.metrics.map(m => [m.metric, m.value, m.trend]),
      startY: yOffset + 5,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    yOffset = doc.lastAutoTable.finalY + 15;
  }

  // Add Inventory Section
  if (data.inventory) {
    doc.setFontSize(14);
    doc.text('Inventory Status', 14, yOffset);
    
    doc.autoTable({
      head: [['Item', 'Stock', 'Reorder Point', 'Turnover']],
      body: data.inventory.map(i => [i.item, i.stock, i.reorderPoint, i.turnover]),
      startY: yOffset + 5,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] }
    });
    
    yOffset = doc.lastAutoTable.finalY + 15;
  }

  // Add Performance Section
  if (data.performance) {
    doc.setFontSize(14);
    doc.text('Supplier Performance', 14, yOffset);
    
    doc.autoTable({
      head: [['Supplier', 'On-Time Delivery', 'Quality', 'Response Time']],
      body: data.performance.map(p => [p.supplier, p.onTimeDelivery, p.quality, p.responseTime]),
      startY: yOffset + 5,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [66, 139, 202] }
    });
  }
  
  // Save PDF
  doc.save(`${reportName}_${formatDate(new Date())}.pdf`);
};

// Generate CSV Report
export const generateCSVReport = async (data, reportName) => {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${reportName}_${formatDate(new Date())}.csv`);
};

// Generate JSON Report
export const generateJSONReport = async (data, reportName) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  saveAs(blob, `${reportName}_${formatDate(new Date())}.json`);
};