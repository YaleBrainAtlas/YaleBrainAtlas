OV.InitModelLoader = function (modelLoader, callbacks)
{
    function OpenErrorDialog (importError)
    {
        if (importError.code === OV.ImportErrorCode.NoImportableFile) {
            return OV.ShowMessageDialog (
                'Something went wrong',
                'No importable file found. You can open obj, 3ds, stl, ply, gltf, glb, 3dm, and off files.',
                importError.message
            );
        } else if (importError.code === OV.ImportErrorCode.ImportFailed) {
            return OV.ShowMessageDialog (
                'Something went wrong',
                'Failed to import model.',
                importError.message
            );
        } else {
            return OV.ShowMessageDialog (
                'Something went wrong',
                'Unknown error.',
                importError.message
            );
        }
    }

    function CloseDialogIfOpen (dialog)
    {
        if (dialog !== null) {
            dialog.Hide ();
            dialog = null;
        }
    }

    let errorDialog = null;
    let progressDialog = null;
    modelLoader.Init ({
        onLoadStart : function () {
            CloseDialogIfOpen (errorDialog);
            callbacks.onStart ();
            progressDialog = new OV.ProgressDialog ();
            progressDialog.Show ('Loading Model');
        },
        onImportStart : function () {
            progressDialog.SetText ('Importing Model');
        },
        onVisualizationStart : function () {
            progressDialog.SetText ('Visualizing Model');
        },
        onModelFinished : function (importResult, threeMeshes) {
            progressDialog.Hide ();
            callbacks.onFinish (importResult, threeMeshes);
        },
        onTextureLoaded : function () {
            callbacks.onRender ();
        },
        onLoadError : function (importError) {
            progressDialog.Hide ();
            errorDialog = OpenErrorDialog (importError);
        },
    });
};
