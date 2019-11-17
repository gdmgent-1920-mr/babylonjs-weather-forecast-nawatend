let snowyScene = () => {

    let canvas = document.getElementById('canvas')
    let engine = new BABYLON.Engine(canvas, true)

    let createScene = () => {
        let scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color3.White()
        //new light otherwise all black
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene)


        //let it snow

        // Create & launch a particule system
        let particleSystem = new BABYLON.ParticleSystem("snowParticles", 5000, scene); // 3600 particles to have a continue effect when computing circle positions
        particleSystem.particleTexture = new BABYLON.Texture("../assets/images/flare.png", scene);
        particleSystem.color1 = new BABYLON.Color4(.9, .9, .95, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.2, .3, .5);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        particleSystem.emitter = new BABYLON.Vector3(0, 20, 0);
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;
        particleSystem.emitRate = 200;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE; // to manage alpha
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        particleSystem.minEmitPower = -10;
        particleSystem.maxEmitPower = -100;
        particleSystem.updateSpeed = 0.001;

        let radius = 15;

        // Custom function to get the circle effect
        particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate) {
            let randX, randY, randZ;
            [randX, randY, randZ] = randomCircleCoords(radius, this.minEmitBox.y);

            BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
        }

        // Start
        particleSystem.start();

        let decalMaterial = new BABYLON.StandardMaterial("decalMat", scene);
        decalMaterial.diffuseTexture = new BABYLON.Texture("../assets/images/impact.png", scene);
        decalMaterial.diffuseTexture.hasAlpha = true;
        decalMaterial.zOffset = -2;

        //space green
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;

        var files = [
            "../assets/skyboxes/Space/space_left.jpg",
            "../assets/skyboxes/Space/space_up.jpg",
            "../assets/skyboxes/Space/space_front.jpg",
            "../assets/skyboxes/Space/space_right.jpg",
            "../assets/skyboxes/Space/space_down.jpg",
            "../assets/skyboxes/Space/space_back.jpg",
        ];

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;


        //all my clouds meshes
        let clouds = ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5", "cloud6", "cloud7", "cloud8",  "cloud10", "cloud11", "cloud12"]

        BABYLON.SceneLoader.ImportMesh(clouds, "../assets/scenes_babylon/", "clouds_anim.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            scene.executeWhenReady(function () {
                // var animation = scene.beginAnimation(newMeshes[1], 0, 20, true, 0.1);
                // scene.activeCamera.attachControl(canvas, false);
                newMeshes.forEach((mesh, id) => {
                    //scene.beginDirectAnimation(mesh, [xSlide], 0, 2 * frameRate, true);
                    scene.beginAnimation(mesh, 0, 120, true, 0.1);
                });
            });
        });

        return scene
    }

    let scene = createScene()

    BABYLON.SceneLoader.Append("../assets/scenes_babylon/", "snowy.babylon", scene);
    scene.executeWhenReady(function () {
        // Attach camera to canvas inputs
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, register a render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    });
}


let randomCircleCoords = (radius, yBase) => {
    let rndAngle = 2 * Math.random() * Math.PI;
    let randX = Math.random() * radius * Math.sin(rndAngle);
    let randY = yBase;
    let randZ = Math.random() * radius * Math.cos(rndAngle);

    return [randX, randY, randZ];
}


let sunnyScene = () => {

    let canvas = document.getElementById('canvas')
    let engine = new BABYLON.Engine(canvas, true)

    let createScene = () => {
        let scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color3.White()
        //new light otherwise all black
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene)
        //space green
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;

        var files = [
            "../assets/skyboxes/Space/space_left.jpg",
            "../assets/skyboxes/Space/space_up.jpg",
            "../assets/skyboxes/Space/space_front.jpg",
            "../assets/skyboxes/Space/space_right.jpg",
            "../assets/skyboxes/Space/space_down.jpg",
            "../assets/skyboxes/Space/space_back.jpg",
        ];

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        //all my clouds meshes
        let clouds = ["cloud3", "cloud4", "cloud12"]

        BABYLON.SceneLoader.ImportMesh(clouds, "../assets/scenes_babylon/", "clouds_anim.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            scene.executeWhenReady(function () {
                // var animation = scene.beginAnimation(newMeshes[1], 0, 20, true, 0.1);
                // scene.activeCamera.attachControl(canvas, false);
                newMeshes.forEach((mesh, id) => {
                    //scene.beginDirectAnimation(mesh, [xSlide], 0, 2 * frameRate, true);
                    scene.beginAnimation(mesh, 0, 120, true, 0.1);
                });
            });
        });

        return scene
    }

    let scene = createScene()

    BABYLON.SceneLoader.Append("../assets/scenes_babylon/", "sunny.babylon", scene);
    scene.executeWhenReady(function () {
        // Attach camera to canvas inputs
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, register a render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    });
}


let rainyScene = () => {


    let canvas = document.getElementById('canvas')
    let engine = new BABYLON.Engine(canvas, true)

    let createScene = () => {
        let scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color3.White()
        //new light otherwise all black
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene)

        // rain time
        BABYLON.ParticleHelper.CreateAsync("rain", scene, true).then((set) =>
            set.start())

        //space green
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;

        var files = [
            "../assets/skyboxes/Space/space_left.jpg",
            "../assets/skyboxes/Space/space_up.jpg",
            "../assets/skyboxes/Space/space_front.jpg",
            "../assets/skyboxes/Space/space_right.jpg",
            "../assets/skyboxes/Space/space_down.jpg",
            "../assets/skyboxes/Space/space_back.jpg",
        ];

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;


        //all my clouds meshes
        let clouds = ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5", "cloud6", "cloud7", "cloud8", "cloud10", "cloud11", "cloud12"]

        BABYLON.SceneLoader.ImportMesh(clouds, "../assets/scenes_babylon/", "clouds_anim.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            scene.executeWhenReady(function () {
                // var animation = scene.beginAnimation(newMeshes[1], 0, 20, true, 0.1);
                // scene.activeCamera.attachControl(canvas, false);
                newMeshes.forEach((mesh, id) => {
                    //scene.beginDirectAnimation(mesh, [xSlide], 0, 2 * frameRate, true);
                    scene.beginAnimation(mesh, 0, 120, true, 0.1);
                });
            });
        });
        return scene
    }

    let scene = createScene()

    BABYLON.SceneLoader.Append("../assets/scenes_babylon/", "rainy.babylon", scene);
    scene.executeWhenReady(function () {
        // Attach camera to canvas inputs
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, register a render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    });
}

let cloudyScene = () => {


    let canvas = document.getElementById('canvas')
    let engine = new BABYLON.Engine(canvas, true)

    let createScene = () => {
        let scene = new BABYLON.Scene(engine)
        scene.clearColor = new BABYLON.Color3.White()
        //new light otherwise all black
        let light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(1, 1, 0), scene)

        //space green
        let skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
        let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;

        var files = [
            "../assets/skyboxes/Space/space_left.jpg",
            "../assets/skyboxes/Space/space_up.jpg",
            "../assets/skyboxes/Space/space_front.jpg",
            "../assets/skyboxes/Space/space_right.jpg",
            "../assets/skyboxes/Space/space_down.jpg",
            "../assets/skyboxes/Space/space_back.jpg",
        ];

        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture.CreateFromImages(files, scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        //all my clouds meshes
        let clouds = ["cloud1", "cloud2", "cloud3", "cloud4", "cloud5", "cloud6", "cloud7", "cloud8", "cloud10", "cloud11", "cloud12"]

        BABYLON.SceneLoader.ImportMesh(clouds, "../assets/scenes_babylon/", "clouds_anim.babylon", scene, function (newMeshes, particleSystems, skeletons) {
            scene.executeWhenReady(function () {
                // var animation = scene.beginAnimation(newMeshes[1], 0, 20, true, 0.1);
                // scene.activeCamera.attachControl(canvas, false);
                newMeshes.forEach((mesh, id) => {
                    //scene.beginDirectAnimation(mesh, [xSlide], 0, 2 * frameRate, true);
                    scene.beginAnimation(mesh, 0, 120, true, 0.1);
                });
            });
        });

        return scene
    }

    let scene = createScene()

    BABYLON.SceneLoader.Append("../assets/scenes_babylon/", "cloudy.babylon", scene);
    scene.executeWhenReady(function () {
        // Attach camera to canvas inputs
        scene.activeCamera.attachControl(canvas);

        // Once the scene is loaded, register a render loop
        engine.runRenderLoop(function () {
            scene.render();
        });
    });
}