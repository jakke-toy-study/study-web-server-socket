import * as THREE from 'three';

export class BasicGizmo {
    private location:{x: number, y: number, z: number};
    private targetObject: THREE.Object3D;

    constructor(
        initialLocation: {x: number, y: number, z: number},
        targetObject: THREE.Object3D
    ) {
        this.location = initialLocation;
        this.targetObject = targetObject;
    }
}