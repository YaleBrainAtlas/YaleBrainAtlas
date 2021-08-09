OV.Modal = class
{
    constructor ()
    {
        this.modalDiv = $('<div>').css ('position', 'absolute');
        this.overlayDiv = null;
        this.resizeHandler = null;
        this.customResizeHandler = null;
        this.closeHandler = null;
        this.isOpen = false;
        this.closeable = true;
    }

    GetContentDiv ()
    {
        return this.modalDiv;
    }

    SetCloseable (closeable)
    {
        this.closeable = closeable;
    }

    SetCustomResizeHandler (customResizeHandler)
    {
        this.customResizeHandler = customResizeHandler;
    }

    SetCloseHandler (closeHandler)
    {
        this.closeHandler = closeHandler;
    }

    Open ()
    {
        let windowObj = $(window);
        let bodyObj = $(document.body);

        this.overlayDiv = $('<div>').addClass ('ov_modal_overlay').css ('position', 'absolute').appendTo (bodyObj);
        this.modalDiv.appendTo (bodyObj);

        this.resizeHandler = this.Resize.bind (this);
        windowObj.bind ('resize', this.resizeHandler);
        if (this.closeable) {
            this.overlayDiv.click ((ev) => {
                this.Close ();
            });
        }

        this.isOpen = true;
        this.Resize ();
    }

    Close ()
    {
        if (!this.isOpen) {
            return;
        }

        let windowObj = $(window);
        windowObj.unbind ('resize', this.resizeHandler);
        if (this.closeHandler !== null) {
            this.closeHandler ();
        }

        this.modalDiv.remove ();
        this.overlayDiv.remove ();
        this.overlayDiv = null;
        this.resizeHandler = null;
        this.isOpen = false;
    }

    IsOpen ()
    {
        return this.isOpen;
    }

    Resize ()
    {
        let windowObj = $(window);
        let windowWidth = windowObj.outerWidth ();
        let windowHeight = windowObj.outerHeight ();
        this.overlayDiv.width (windowWidth);
        this.overlayDiv.height (windowHeight);
        this.overlayDiv.offset ({
            left : 0,
            top : 0
        });
        if (this.customResizeHandler) {
            this.customResizeHandler (this.modalDiv);
        } else {
            this.modalDiv.offset ({
                left : (windowWidth - this.modalDiv.outerWidth ()) / 2,
                top : (windowHeight - this.modalDiv.outerHeight ()) / 3
            });
        }
    }
};

OV.ProgressDialog = class
{
    constructor ()
    {
        this.modal = new OV.Modal ();
        this.modal.SetCloseable (false);
        this.imageDiv = null;
        this.textDiv = null;
    }

    SetText (text)
    {
        this.textDiv.html (text);
    }

    Show (text)
    {
        let contentDiv = this.modal.GetContentDiv ();
        contentDiv.addClass ('ov_progress');

        this.imageDiv = $('<img>').addClass ('ov_progress_img').attr ('src', 'images/logo.png').appendTo (contentDiv);
        this.textDiv = $('<div>').addClass ('ov_progress_text').appendTo (contentDiv);
        
        this.SetText (text);
        this.modal.Open ();
    }

    Hide ()
    {
        this.modal.Close ();
    }
};

OV.ButtonDialog = class
{
    constructor ()
    {
        this.modal = new OV.Modal ();
    }

    Init (title, buttons)
    {
        function AddButton (button, buttonsDiv)
        {
            let buttonDiv = $('<div>').addClass ('ov_dialog_button').html (button.name).appendTo (buttonsDiv);
            if (button.subClass) {
                buttonDiv.addClass (button.subClass);
            }
            buttonDiv.click (() => {
                button.onClick ();
            });
        }

        let contentDiv = this.modal.GetContentDiv ();
        contentDiv.addClass ('ov_dialog');

        $('<div>').addClass ('ov_dialog_title').html (title).appendTo (contentDiv);
        let dialogContentDiv = $('<div>').addClass ('ov_dialog_content').appendTo (contentDiv);
        let buttonsDiv = $('<div>').addClass ('ov_dialog_buttons').appendTo (contentDiv);
        let buttonsInnerDiv = $('<div>').addClass ('ov_dialog_buttons_inner').appendTo (buttonsDiv);
        for (let i = 0; i < buttons.length; i++) {
            AddButton (buttons[i], buttonsInnerDiv);
        }
        
        return dialogContentDiv;
    }

    SetCloseable (closeable)
    {
        this.modal.SetCloseable (closeable);
    }

    SetCloseHandler (closeHandler)
    {
        this.modal.SetCloseHandler (closeHandler);
    }

    Show ()
    {
        this.modal.Open ();
    }

    Hide ()
    {
        this.modal.Close ();
    }
};

OV.PopupDialog = class
{
    constructor ()
    {
        this.modal = new OV.Modal ();
    }

    Init (parentItem)
    {
        let contentDiv = this.modal.GetContentDiv ();
        contentDiv.addClass ('ov_popup');
        this.modal.SetCustomResizeHandler ((modalDiv) => {
            let offset = parentItem.offset ();
            let left = offset.left + parentItem.outerWidth (false);
            let bottom = offset.top + parentItem.outerHeight (false);
            modalDiv.offset ({
                left : left,
                top : bottom - modalDiv.outerHeight (true)
            });
        });        
        return contentDiv;
    }

    SetCustomResizeHandler (customResizeHandler)
    {
        this.modal.SetCustomResizeHandler (customResizeHandler);
    }

    Show ()
    {
        this.modal.Open ();
    }

    Hide ()
    {
        this.modal.Close ();
    }
};

OV.ListPopup = class extends OV.PopupDialog
{
    constructor ()
    {
        super ();
        this.listDiv = null;
    }

    Init (parentItem)
    {
        let contentDiv = super.Init (parentItem);
        this.listDiv = $('<div>').addClass ('ov_popup_list').addClass ('ov_thin_scrollbar').appendTo (contentDiv);
        return contentDiv;
    }

    AddListItem (item, callbacks)
    {
        let listItemDiv = $('<div>').addClass ('ov_popup_list_item').appendTo (this.listDiv);
        if (item.color) {
            let iconDiv = $('<div>').addClass ('ov_popup_list_item_icon').appendTo (listItemDiv);
            let colorCircle = OV.CreateInlineColorCircle (item.color);
            colorCircle.appendTo (iconDiv);
        }
        $('<div>').addClass ('ov_popup_list_item_name').html (item.name).appendTo (listItemDiv);
        listItemDiv.click (callbacks.onClick);
        if (OV.IsHoverEnabled () && callbacks.onHoverStart && callbacks.onHoverStop) {
            listItemDiv.hover (
                () => {
                    callbacks.onHoverStart ();
                },
                () => {
                    callbacks.onHoverStop ();
                }
            );
        }
    }
};
