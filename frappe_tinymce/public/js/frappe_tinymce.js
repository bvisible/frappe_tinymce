frappe.ui.form.ControlTextEditor = class ControlTextEditor extends frappe.ui.form.ControlCode {
    make_wrapper() {
        super.make_wrapper();
    }

    make_input() {
        this.has_input = true;
        this.make_quill_editor();
    }

    make_quill_editor() {
        const that = this
        this.quill_container = $('<div>').appendTo(this.input_area);
        tinymce.init({
            target: this.input_area,
            toolbar: 'undo redo | bold italic underline strikethrough | fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | footnotes | mergetags',
            font_size_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',
            plugins: [
              'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen',
              'link', 'lists', 'searchreplace',
              'table', 'visualblocks', 'visualchars', 'wordcount',
            ],
            powerpaste_googledocs_import: "prompt",
            entity_encoding: 'raw',
            convert_urls: true,
            content_css: false,
            toolbar_sticky: true,
            promotion: false,
            link_default_target: "_blank",
            menubar: false,
            skin: "snow",
            icons: "small",
            setup: function(editor) {
                that.editor_id = editor.id
                editor.on('Change', function(e) {
                    that.parse_validate_and_set_in_model(e.level.content);
                });
                editor.on('init', function (e) {
                    // Vérifier que `that.value` n'est pas `undefined` avant d'appeler `setContent`
                    if (that.value !== undefined) {
                        editor.setContent(that.value);
                    }
                    that.activeEditor = editor; // assign activeEditor when TinyMCE is fully initialized
                });
            }
        });
    }

    set_formatted_input(value){
        if (this.frm && !this.frm.doc.__setContent){
            // Check if activeEditor is not undefined
            if(this.activeEditor){
                if(value){
                    this.activeEditor.setContent(value)
                } else {
                    this.activeEditor.setContent("")
                }
                this.frm.doc.__setContent = 1
            }
        }
    }
}