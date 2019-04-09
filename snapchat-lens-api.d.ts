
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
	/**
	 * TweenManager
	 */
	tweenManager: TweenManager;
	/**
	 * Returns the global PersistentStorageSystem, which allows data 
	 * to persist between Lens sessions.
	 */
	persistentStorageSystem: PersistentStorageSystem;
};

declare const script: {
	[index: string]: any;
	createEvent(eventType: EventType): SceneEvent;
	/**
	 * The api property is a member property of the Script Component 
	 * where you can store references to properties and functions 
	 * that you'd like to make available to other Script Components.
	 */
	api: { [index: string]: any };
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
 * A two dimensional vector.
 */
interface vec2 {
	x: number;
	y: number;
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
 * A four dimensional vector.
 */
declare class vec4 {
	x: number;
	y: number;
	z: number;
	w: number;
	constructor(...args: number[]);
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
	/**
	 * Plays the current sound loops number of times. If loops is -1, the sound will repeat forever.
	 */
	play(loops: number): void;
	/**
	 * Sets the callback function to be called whenever this sound stops playing.
	 */
	setOnFinish(eventCallback: () => void): void;
	/**
	 * The length (in seconds) of the current sound assigned to play.
	 */
	duration: number;
	/**
	 * A volume multiplier for any sounds played by this AudioComponent.
	 */
	volume: number;
}
interface AudioEffectComponent extends Component {}
interface ScriptComponent      extends Component {
	/**
	 * The api property is a member property of the Script Component 
	 * where you can store references to properties and functions 
	 * that you'd like to make available to other Script Components.
	 */
	api: { [index: string]: any };
}
interface MeshVisual           extends Component {
	/**
	 * Returns the number of Materials on the MeshVisual.
	 */
	getMaterialsCount(): number;
	/**
	 * Returns the first Material.
	 */
	mainMaterial: Material;
	/**
	 * Returns the mainPass of the mainMaterial.
	 */
	mainPass: Pass;
}
interface SpriteVisual         extends MeshVisual {
	/**
	 * Returns the width and height of the mesh the SpriteVisual is applied to.
	 */
	getMeshSize(): vec2;
	/**
	 * Which type of fill the sprite uses.
	 */
	fillMode: number;
}
interface Label extends SpriteVisual {
	/**
	 * Returns the potential width and height of the Label if it were to display the input text.
	 */
	measureText(text: string): vec2;
	/**
	 * The font size being used.
	 */
	size: number;
	/**
	 * The text displayed by the Label.
	 */
	text: string;
}


interface Asset extends SerializableWithUID {
	/**
	 * The name of the Asset in Lens Studio.
	 */
	name: string;
}
interface AnimationLayer    extends Asset {}
interface AudioEffectAsset  extends Asset {}
interface AudioTrackAsset   extends Asset {}
interface BinAsset          extends Asset {}
interface Font              extends Asset {}
interface MarkerAsset       extends Asset {}
interface Material          extends Asset {}
interface ObjectPrefab      extends Asset {}
interface RenderMesh        extends Asset {}
interface SegmentationModel extends Asset {}
interface Texture           extends Asset {}


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


interface TweenManager {
	startTween(
		sceneObject: SceneObject,
		tweenName:   string,
		onComplete?: () => void,
		onStart?:    () => void,
		onStop?:     () => void,
	): void;
	stopTween  (sceneObject: SceneObject, tweenName: string): void;
	pauseTween (sceneObject: SceneObject, tweenName: string): void;
	resumeTween(sceneObject: SceneObject, tweenName: string): void;
	resetObject(sceneObject: SceneObject, tweenName: string): void;
	
	getGenericTweenValue<T>(sceneObject: SceneObject, tweenName: string): T;
	setStartValue<T>(sceneObject: SceneObject, tweenName: string, newStartValue: T): void;
	setEndValue<T>  (sceneObject: SceneObject, tweenName: string, newEndValue: T): void;
}

/**
 * Controls how a mesh will get rendered. Each Pass acts as an interface for the shader 
 * it’s associated with. Any properties on a Pass’s shader will automatically become 
 * properties on that Pass. For example, if the shader defines a variable named baseColor, 
 * a script would be able to access that property as Pass.baseColor.
 * 
 * @see https://lensstudio.snapchat.com/api/classes/Pass/
 */
interface Pass {
	blendMode: number;
	name:      string;
	baseColor: vec4;
}

/**
 * Allows data to be stored and retrieved between Lens sessions. 
 * In other words, data can be saved on device and loaded back in the next time 
 * the Lens is opened. Can be accessed with global.persistentStorageSystem.
 */
interface PersistentStorageSystem {
	store: GeneralDataStore;
}
interface GeneralDataStore {
	/**
	 * Clears all data stored in the General Data Store.
	 */
	clear(): void;
	/**
	 * Returns a boolean value stored under the given key, or false if none exists.
	 */
	getBool(key: string): boolean;
	/**
	 * Returns a floating point value stored under the given key, or 0 if none exists.
	 */
	getFloat(key: string): number;
	/**
	 * Returns true if a value is being stored under the given key.
	 */
	has(key: string): boolean;
	/**
	 * Stores a boolean value under the given key.
	 */
	putBool(key: string, value: boolean): void;
	/**
	 * Stores a floating point value under the given key.
	 */
	putFloat(key: string, value: number): void;
	/**
	 * Removes the value being stored under the given key. If no value exists under the key, nothing will happen.
	 */
	remove(key: string): void;
}
