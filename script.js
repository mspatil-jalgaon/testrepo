window.jsPDF = window.jspdf.jsPDF;

document.getElementById('convertBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const previewImage = document.getElementById('previewImage');
    previewImage.src = e.target.result;

    document.getElementById('uploadSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const imgData = document.getElementById('previewImage').src;
  const pdf = new jsPDF();
  const img = new Image();
  img.src = imgData;

  img.onload = function () {
    const width = pdf.internal.pageSize.getWidth();
    const height = (img.height * width) / img.width;
    pdf.addImage(img, 'PNG', 0, 10, width, height);
    pdf.save('converted.pdf');
  };
});