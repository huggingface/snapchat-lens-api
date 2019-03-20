
/**
 * Returns the time difference in seconds between the current frame and previous frame.
 */
declare function getDeltaTime(): number;
/**
 * Returns the time in seconds since the lens was started.
 */
declare function getTime(): number;
/**
 * Prints out a message to the Logger window.
 */
declare function print(object: any): void;

declare const global: {
	/**
	 * Returns the global ScriptScene object, 
	 * which offers information and controls for the current scene.
	 */
	scene: ScriptScene;
};

declare const script: {
	[index: string]: any;
	createEvent(eventType: EventType): SceneEvent;
};

/**
 * Represents the Lens scene. Accessible through global.scene.
 */
interface ScriptScene {
	/**
	 * Adds a new SceneObject named name to the scene.
	 */
	createSceneObject(name: string): SceneObject;
	/**
	 * Returns a string describing the currently active device camera.
	 * 
	 * Returns “back” if the rear-facing (aka World) camera is active.
	 * 
	 * Returns “front” if the front-facing (aka Selfie) camera is active.
	 * 
	 * Otherwise, the camera is not initialized.
	 */
	getCameraType(): string;
	/**
	 * Returns the root SceneObject at index index in the current scene.
	 */
	getRootObject(index: number): SceneObject;
	/**
	 * Returns the number of SceneObjects in the current scene.
	 */
	getRootObjectsCount(): number;
	/**
	 * Returns whether or not the scene is currently being recorded.
	 */
	isRecording(): boolean;
}

/**
 * Low-level data class.
 */
interface SerializableWithUID {
	/**
	 * Returns the name of this object’s type.
	 */
	getTypeName(): string;
}

/**
 * An object in the scene hierarchy, containing a Transform and possibly Components. 
 * A script can access the SceneObject holding it through the property script.getSceneObject().
 */
interface SceneObject extends SerializableWithUID {
	/**
	 * Whether the SceneObject, including its components and children, is enabled or disabled.
	 */
	enabled : boolean;
	/**
	 * The name of the SceneObject.
	 */
	name: string;
	/**
	 * Returns the attached component of type componentType at index index. 
	 * If componentType is an empty string, all component types are considered.
	 */
	getComponentByIndex(componentType: string, index: number): Component;
	/**
	 * Returns the number of components of type componentType attached to the SceneObject. 
	 * If componentType is an empty string, the total number of components attached is returned.
	 */
	getComponentCount(componentType: string): number;
	/**
	 * Returns the first attached component of type componentType. 
	 * If componentType is an empty string, the first component of any type is returned.
	 */
	getFirstComponent(componentType: string): Component;
	/**
	 * Returns the Transform attached to the SceneObject.
	 */
	getTransform(): Transform;
}


/**
 * Controls the position, rotation, and scale of a SceneObject. 
 * Every SceneObject automatically has a Transform attached.
 */
interface Transform {
	getLocalPosition(): vec3;
	getWorldPosition(): vec3;
}

/**
 * A three dimensional vector.
 */
interface vec3 {
	x: number;
	y: number;
	z: number;
}



/**
 * The base class for all components. Components are attached to SceneObjects.
 */
interface Component extends SerializableWithUID {
	/**
	 * If disabled, the Component will stop enacting its behavior.
	 */
	enabled: boolean;
	/**
	 * Destroys the component.
	 */
	destroy(): void;
	/**
	 * Returns the SceneObject the component is attached to.
	 */
	getSceneObject(): SceneObject;
	/**
	 * Returns the Transform this component is attached to.
	 */
	getTransform(): Transform;
}

interface AudioComponent extends Component {
	/**
	 * The audio asset currently assigned to play.
	 */
	audioTrack: AudioTrackAsset;
	play(loops: number): void;
	/**
	 * Sets the callback function to be called whenever this sound stops playing.
	 */
	setOnFinish(eventCallback: () => void): void;
}


interface Asset extends SerializableWithUID {
	/**
	 * The name of the Asset in Lens Studio.
	 */
	name: string;
}
interface AudioTrackAsset extends Asset {}



type EventType =
| 'BrowsLoweredEvent'
| 'BrowsRaisedEvent'
| 'BrowsReturnedToNormalEvent'
| 'CameraBackEvent'
| 'CameraFrontEvent'
| 'DelayedCallbackEvent'
| 'FaceFoundEvent'
| 'FaceLostEvent'
| 'FaceTrackingEvent'
| 'KissFinishedEvent'
| 'KissStartedEvent'
| 'LateUpdateEvent'
| 'ManipulateEndEvent'
| 'ManipulateStartEvent'
| 'MouthClosedEvent'
| 'MouthOpenedEvent'
| 'SceneEvent'
| 'SceneObjectEvent'
| 'SmileFinishedEvent'
| 'SmileStartedEvent'
| 'SurfaceTrackingResetEvent'
| 'TapEvent'
| 'TouchEndEvent'
| 'TouchMoveEvent'
| 'TouchStartEvent'
| 'TurnOffEvent'
| 'TurnOnEvent'
| 'UpdateEvent'
;

interface SceneEvent {
	enabled: boolean;
	bind(evCallback: () => void): void;
}
