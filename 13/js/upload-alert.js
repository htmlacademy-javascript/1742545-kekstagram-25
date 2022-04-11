function showUploadSection(uploadElement, uploadSectionButton, sectionClass) {
  document.body.appendChild(uploadElement);
  const section = document.querySelector(sectionClass);

  function closeUploadSection() {
    document.body.removeChild(uploadElement);
    document.removeEventListener('keyup', onEscape);

    uploadSectionButton.removeEventListener('click', closeUploadSection);
    section.removeEventListener('click', closeUploadSection);
  }

  uploadSectionButton.addEventListener('click', closeUploadSection);

  function onEscape(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeUploadSection();
    }
  }

  document.addEventListener('keyup', onEscape);
  section.addEventListener('click', closeUploadSection);
}

export { showUploadSection };
