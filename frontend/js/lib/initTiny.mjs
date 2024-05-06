import tinymce from 'tinymce';

export let isEditorInit = false;

export function setEditorInit(value) {
  isEditorInit = value;
}

export default function intitTiny() {
  if (!isEditorInit) {
    tinymce.init({
      selector: '#docTextField',
      menubar: false,
      statusbar: false,
      toolbar:
        'undo redo | fontfamily fontsize bold italic | forecolor backcolor | alignleft aligncenter alignright | removeformat',
      setup: function (editor) {
        editor.on('change', function () {
          editor.save();
        });
      },
    });
    isEditorInit = true;
  }
}
