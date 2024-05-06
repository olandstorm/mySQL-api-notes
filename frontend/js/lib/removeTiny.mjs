import { setEditorInit, isEditorInit } from './initTiny.mjs';

export default function removeTiny() {
  if (isEditorInit) {
    tinymce.get('docTextField').remove();
    setEditorInit(false);
  }
}
