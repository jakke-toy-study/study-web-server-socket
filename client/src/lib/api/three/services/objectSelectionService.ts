import * as THREE from 'three';
import type { SceneController } from "../SceneController";

export class ObjectSelectionService {
    constructor(instance: SceneController) {
        this.sceneController = instance;
        this.selectedObjectMap = new Map();
        this.originalObject = new Map();
        this.sceneController.getRenderer().domElement.addEventListener('click', this.onMouseClick.bind(this));
    }

    private sceneController: SceneController;
    private selectedObjectMap: Map<string, THREE.Object3D>;
    private originalObject: Map<string, THREE.Object3D>;
    readonly highlightMaterialMesh: THREE.Material = new THREE.MeshPhongMaterial({
        color: 0xffc954,
        transparent: true,
        opacity: 0.25,

        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    });

    readonly highlightMaterialEdge: THREE.Material = new THREE.LineBasicMaterial({
        color: 0xff7d03,
    });
    
    registerObject(object: THREE.Object3D) {
        if(this.selectedObjectMap.get(object.uuid)) return;

        // Register original state
        this.originalObject.set(object.uuid, object);

    }

    private applyHighlightMaterial(object: THREE.Object3D) {
        
    }

    private onMouseClick(event: MouseEvent): void {
        this.onMouseClickForObjectSelect(event);
    }

    private onMouseClickForObjectSelect = (event: MouseEvent) => {
        //Mouse Position Calculation
        this.sceneController.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.sceneController.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //Update the raycaster as current camera and mouse poisition
        this.sceneController.raycaster.setFromCamera(this.sceneController.mouse, this.sceneController.getCamera());

        //Raycasting and pick object
        const intersects = this.sceneController.raycaster.intersectObjects(this.sceneController.getScene().children, false)
        const exceptHelpers = intersects.filter(
                i => (i.object.type != 'GridHelper' && 
                i.object.type != 'AxesHelper')
        );

        if(exceptHelpers.length > 0) {
            
        }
    }
}