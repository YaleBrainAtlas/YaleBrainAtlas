var assert = require ('assert');

describe ('Model', function() {
    it ('Default Initialization', function () {
        var model = new OV.Model ();
        assert.strictEqual (model.MaterialCount (), 0);
        assert.strictEqual (model.MeshCount (), 0);
    });

    it ('Add Material', function () {
        var model = new OV.Model ();
        var material = new OV.Material (OV.MaterialType.Phong);
        material.name = 'example';
        var index = model.AddMaterial (material);
        assert.strictEqual (model.MaterialCount (), 1);
        var theMaterial = model.GetMaterial (index);
        assert.strictEqual (theMaterial.name, 'example');
    });

    it ('Add Mesh', function () {
        var model = new OV.Model ();
        var mesh = new OV.Mesh ();
        mesh.SetName ('example');
        var index = model.AddMesh (mesh);
        assert.strictEqual (model.MeshCount (), 1);
        var theMesh = model.GetMesh (index);
        assert.strictEqual (theMesh.GetName (), 'example');
    });

    it ('Add Mesh To Index', function () {
        var model = new OV.Model ();
        var mesh1 = new OV.Mesh ();
        var mesh2 = new OV.Mesh ();
        var mesh3 = new OV.Mesh ();
        var mesh4 = new OV.Mesh ();
        mesh1.SetName ('A');
        mesh2.SetName ('B');
        mesh3.SetName ('C');
        mesh4.SetName ('D');
        model.AddMesh (mesh1);
        model.AddMesh (mesh2);
        model.AddMeshToIndex (mesh3, 1);
        model.AddMeshToIndex (mesh4, 3);
        assert.strictEqual (model.GetMesh (0).GetName (), 'A');
        assert.strictEqual (model.GetMesh (1).GetName (), 'C');
        assert.strictEqual (model.GetMesh (2).GetName (), 'B');
        assert.strictEqual (model.GetMesh (3).GetName (), 'D');
    });

    it ('Counters', function () {
        var model = new OV.Model ();
        let mesh = new OV.Mesh ();
        mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh.AddNormal (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh.AddNormal (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh.AddTextureUV (new OV.Coord2D (0.0, 0.0));
        mesh.AddTriangle (new OV.Triangle (0, 1, 2));
        mesh.AddTriangle (new OV.Triangle (0, 1, 2));
        mesh.AddTriangle (new OV.Triangle (0, 1, 2));
        mesh.AddTriangle (new OV.Triangle (0, 1, 2));
        model.AddMesh (mesh);
        assert.strictEqual (model.VertexCount (), 3);
        assert.strictEqual (model.NormalCount (), 2);
        assert.strictEqual (model.TextureUVCount (), 1);
        assert.strictEqual (model.TriangleCount (), 4);
    });

    it ('Remove Mesh', function () {
        var model = new OV.Model ();
        
        let mesh1 = new OV.Mesh ();
        mesh1.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        mesh1.AddVertex (new OV.Coord3D (1.0, 0.0, 0.0));
        mesh1.AddVertex (new OV.Coord3D (1.0, 1.0, 0.0));
        mesh1.AddTriangle (new OV.Triangle (0, 1, 2));
        model.AddMesh (mesh1);

        let mesh2 = new OV.Mesh ();
        mesh2.AddVertex (new OV.Coord3D (0.0, 0.0, 1.0));
        mesh2.AddVertex (new OV.Coord3D (1.0, 0.0, 1.0));
        mesh2.AddVertex (new OV.Coord3D (1.0, 1.0, 1.0));
        mesh2.AddTriangle (new OV.Triangle (0, 1, 2));
        model.AddMesh (mesh2);

        assert.strictEqual (model.MeshCount (), 2);
        assert.strictEqual (model.VertexCount (), 6);
        assert.strictEqual (model.TriangleCount (), 2);

        model.RemoveMesh (0);
        assert.strictEqual (model.MeshCount (), 1);
        assert.strictEqual (model.VertexCount (), 3);
        assert.strictEqual (model.TriangleCount (), 1);

        model.RemoveMesh (0);
        assert.strictEqual (model.MeshCount (), 0);
        assert.strictEqual (model.VertexCount (), 0);
        assert.strictEqual (model.TriangleCount (), 0);
    });    
});

describe ('Model Finalization', function() {
    it ('Calculate Normal', function () {
        var mesh = new OV.Mesh ();
        var v0 = mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        var v1 = mesh.AddVertex (new OV.Coord3D (1.0, 0.0, 0.0));
        var v2 = mesh.AddVertex (new OV.Coord3D (1.0, 1.0, 0.0));
        var triangleIndex = mesh.AddTriangle (new OV.Triangle (v0, v1, v2));
        var model = new OV.Model ();
        var meshIndex = model.AddMesh (mesh);
        assert.strictEqual (model.MaterialCount (), 0);
        OV.FinalizeModel (model, function () { return new OV.Material (OV.MaterialType.Phong) });
        assert.strictEqual (model.MaterialCount (), 1);
        var theMesh = model.GetMesh (meshIndex);
        assert.strictEqual (theMesh.NormalCount (), 1);
        var triangle = theMesh.GetTriangle (triangleIndex);
        assert.strictEqual (triangle.n0, 0);
        assert.strictEqual (triangle.n1, 0);
        assert.strictEqual (triangle.n2, 0);
        assert.strictEqual (triangle.mat, 0);
    });

    it ('Calculate Curved Normal', function () {
        var mesh = new OV.Mesh ();
        var v0 = mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        var v1 = mesh.AddVertex (new OV.Coord3D (1.0, 0.0, 0.0));
        var v2 = mesh.AddVertex (new OV.Coord3D (1.0, 1.0, 0.0));
        var v3 = mesh.AddVertex (new OV.Coord3D (0.0, 0.0, -1.0));

        var triangle1 = new OV.Triangle (v0, v1, v2);
        triangle1.curve = 1;
        var triangle2 = new OV.Triangle (v0, v3, v1);
        triangle2.curve = 1;

        var triangle1 = mesh.AddTriangle (triangle1);
        var triangle1 = mesh.AddTriangle (triangle2);

        var model = new OV.Model ()
        var meshIndex = model.AddMesh (mesh);

        OV.FinalizeModel (model, function () { return new OV.Material (OV.MaterialType.Phong) });
        
        var theMesh = model.GetMesh (meshIndex);
        assert.strictEqual (theMesh.NormalCount (), 6);
        
        var normal = theMesh.GetNormal (0);
        assert.strictEqual (normal.x, 0.0);
        assert.strictEqual (normal.y, -0.7071067811865475);
        assert.strictEqual (normal.z, 0.7071067811865475);
    });

    it ('Calculate Curved Normal 2', function () {
        var mesh = new OV.Mesh ();
        var v0 = mesh.AddVertex (new OV.Coord3D (0.0, 0.0, 0.0));
        var v1 = mesh.AddVertex (new OV.Coord3D (1.0, 0.0, 0.0));
        var v2 = mesh.AddVertex (new OV.Coord3D (1.0, 1.0, 0.0));
        var v3 = mesh.AddVertex (new OV.Coord3D (0.0, 0.0, -1.0));
        var v4 = mesh.AddVertex (new OV.Coord3D (0.0, 1.0, 0.0));

        var triangle1 = new OV.Triangle (v0, v1, v2);
        triangle1.curve = 1;
        var triangle2 = new OV.Triangle (v0, v2, v4);
        triangle2.curve = 1;
        var triangle3 = new OV.Triangle (v0, v3, v1);
        triangle3.curve = 1;

        mesh.AddTriangle (triangle1);
        mesh.AddTriangle (triangle2);
        mesh.AddTriangle (triangle3);

        var model = new OV.Model ()
        var meshIndex = model.AddMesh (mesh);

        OV.FinalizeModel (model, function () { return new OV.Material (OV.MaterialType.Phong) });
        
        var theMesh = model.GetMesh (meshIndex);
        assert.strictEqual (theMesh.NormalCount (), 9);
        
        var normal = theMesh.GetNormal (0);
        assert.strictEqual (normal.x, 0.0);
        assert.strictEqual (normal.y, -0.7071067811865475);
        assert.strictEqual (normal.z, 0.7071067811865475);
    });    
});

describe ('Color Conversion', function() {
    it ('Color equality check', function () {
        assert (OV.ColorIsEqual (new OV.Color (10, 20, 30), new OV.Color (10, 20, 30)));
        assert (!OV.ColorIsEqual (new OV.Color (10, 20, 30), new OV.Color (11, 20, 30)));
        assert (!OV.ColorIsEqual (new OV.Color (10, 20, 30), new OV.Color (10, 21, 30)));
        assert (!OV.ColorIsEqual (new OV.Color (10, 20, 30), new OV.Color (10, 20, 31)));
    });

    it ('Color hex string conversion', function () {
        let color = new OV.Color (10, 20, 30);
        let hexString = '0a141e';
        assert.strictEqual (OV.ColorToHexString (color), hexString);
        assert.deepStrictEqual (OV.HexStringToColor (hexString), color);
    });
});
