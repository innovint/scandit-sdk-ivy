import { EventEmitter, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { ScanResult } from "scandit-sdk";
import { ScanditSdkService } from "./scandit-sdk.service";
import * as i0 from "@angular/core";
/**
 * Scandit SDK Barcode Picker Component handling camera input and scanning operations.
 */
export declare class ScanditSdkBarcodePickerComponent implements OnInit, OnDestroy, OnChanges {
    private readonly scanditSdkService;
    /**
     * Handle scanned barcodes via a passed ScanResult object
     *
     * See https://docs.scandit.com/stable/web/interfaces/scanresult.html
     * and https://docs.scandit.com/stable/web/classes/barcodepicker.html#onscan
     */
    scan: EventEmitter<ScanResult>;
    /**
     * Handle processed frames
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onprocessframe
     */
    processFrame: EventEmitter<ScanResult>;
    /**
     * Handle submitted frames
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onsubmitframe
     */
    submitFrame: EventEmitter<ScanResult>;
    /**
     * Handle errors while scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onscanerror
     */
    error: EventEmitter<Error>;
    /**
     * Emitted when the component is initialized.
     *
     * At this moment, the picker is still being created and configured, use `(ready)` to get notified when
     * the picker is ready.
     */
    init: EventEmitter<void>;
    /**
     * Emitted when the picker is ready.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onready
     */
    ready: EventEmitter<void>;
    /**
     * Whether there the camera should be accessed.
     *
     * Set this to false initially to create the picker without camera access.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#accesscamera
     */
    private set shouldAccessCamera(value);
    /**
     * The active camera
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setactivecamera
     */
    private set camera(value);
    /**
     * The camera settings
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#applycamerasettings
     */
    private set cameraSettings(value);
    /**
     * The initial camera type (can only be set at creation)
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     */
    private set cameraType(value);
    /**
     * Whether to enable the camera switcher button
     */
    private set enableCameraSwitcher(value);
    /**
     * Whether to enable the torch toggle button
     */
    private set enableTorchToggle(value);
    /**
     * Set the zoom level of the device
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setzoom
     */
    private set zoom(value);
    /**
     * Whether to enable pinch to zoom on the camera preview
     */
    private set enablePinchToZoom(value);
    /**
     * Whether to enable camera's video mirroring along the vertical axis
     */
    private set mirrorImage(value);
    /**
     * Whether to enable tap to focus on the camera preview
     */
    private set enableTapToFocus(value);
    /**
     * Which GUI style to use for the barcode picker
     *
     * See https://docs.scandit.com/stable/web/enums/barcodepicker.guistyle.html
     * and https://docs.scandit.com/stable/web/classes/barcodepicker.html#setguistyle
     */
    private set guiStyle(value);
    /**
     * Set the area of the laser displayed when the GUI style is set to laser.
     * This affects UI only.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setlaserarea
     */
    private set laserArea(value);
    /**
     * Set the area of the viewfinder when the GUI style is set to viewfinder.
     * This affects UI only.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setviewfinderarea
     */
    private set viewfinderArea(value);
    /**
     * Whether the internal scanner should be paused or not
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#pausescanning
     */
    private set paused(value);
    /**
     * Whether there should be a sound after scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setplaysoundonscanenabled
     */
    private set playSoundOnScan(value);
    /**
     * Whether the device should vibrate after scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvibrateonscanenabled
     */
    private set vibrateOnScan(value);
    /**
     * The scan settings to be used for the internal scanner
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#applyscansettings
     */
    private set scanSettings(value);
    /**
     * The target scanning FPS
     *
     *  See https://docs.scandit.com/stable/web/classes/barcodepicker.html#settargetscanningfps
     */
    private set targetScanningFPS(value);
    /**
     * The fit of the camera preview element
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvideofit
     */
    private set videoFit(value);
    /**
     * Whether the camera preview is visible
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvisible
     */
    private set visible(value);
    /**
     * The "single image mode" settings (can only be set at creation)
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     */
    private set singleImageModeSettings(value);
    /**
     * BarcodePicker reference
     */
    private picker;
    /**
     * Private variable of `shouldAccessCamera`
     */
    private _shouldAccessCamera;
    /**
     * Private variable of `camera`
     */
    private _camera;
    /**
     * Private variable of `cameraSettings`
     */
    private _cameraSettings;
    /**
     * Private variable of `cameraType`
     */
    private _cameraType;
    /**
     * Private variable of `enableCameraSwitcher`
     */
    private _enableCameraSwitcher;
    /**
     * Private variable of `enableTorchToggle`
     */
    private _enableTorchToggle;
    /**
     * Private variable of `setZoomLevel`
     */
    private _zoom;
    /**
     * Private variable of `enablePinchToZoom`
     */
    private _enablePinchToZoom;
    /**
     * Private variable of `mirrorImage`
     */
    private _enableMirrorImage;
    /**
     * Private variable of `enableTapToFocus`
     */
    private _enableTapToFocus;
    /**
     * Private variable of `guiStyle`
     */
    private _guiStyle;
    /**
     * Private variable of `laserArea`
     */
    private _laserArea;
    /**
     * Private variable of `viewfinderArea`
     */
    private _viewfinderArea;
    /**
     * Private variable of `paused`
     */
    private _paused;
    /**
     * Private variable of `playSoundOnScan`
     */
    private _playSoundOnScan;
    /**
     * Private variable of `vibrateOnScan`
     */
    private _vibrateOnScan;
    /**
     * Private variable of `scanSettings`
     */
    private _scanSettings;
    /**
     * Private variable of `targetScanningFPS`
     */
    private _targetScanningFPS;
    /**
     * Private variable of `videoFit`
     */
    private _videoFit;
    /**
     * Private variable of `visible`
     */
    private _visible;
    /**
     * Private variable of `singleImageModeSettings`
     */
    private _singleImageModeSettings;
    /**
     * Reference to the element containing the picker
     */
    private readonly pickerContainer;
    /**
     * A queue of operations to be executed
     *
     * As soon as a picker is available, there could be changes to the @Input properties,
     * which trigger operations to be added to this queue.
     *
     * As operations on the picker are mostly promises, this queue is executed serially
     * and should include promise factory functions.
     */
    private readonly operationQueue;
    /**
     * If the component is initialized yet or not
     */
    private isInitialized;
    /**
     * Creates an instance of ScanditSdkBarcodePickerComponent.
     * @param scanditSdkService Dependency Injection for scanditSdkService
     */
    constructor(scanditSdkService: ScanditSdkService);
    /**
     * Angular Lifecycle hook, on component initialization, create the picker,
     * set some callback handlers and set the proper states
     */
    ngOnInit(): void;
    /**
     * Angular Lifecycle hook to destroy the picker when the component is destroyed
     */
    ngOnDestroy(): void;
    /**
     * Angular Lifecycle hook to execute the operation queue after any Input property changes
     */
    ngOnChanges(): void;
    /**
     * Handler to create the operation after an input change
     */
    private setShouldAccessCamera;
    /**
     * Handler to create the operation after an input change
     */
    private setCameraAndSettings;
    /**
     * Handler to create the operation after an input change
     */
    private setCameraSettings;
    /**
     * Handler to create the operation after an input change
     */
    private setEnableCameraSwitcher;
    /**
     * Handler to create the operation after an input change
     */
    private setEnableTorchToggle;
    /**
     * Handler to create the operation after an input change
     */
    private setZoomLevel;
    /**
     * Handler to create the operation after an input change
     */
    private setEnablePinchToZoom;
    /**
     * Handler to create the operation after an input change
     */
    private setImageMirrorEnabled;
    /**
     * Handler to create the operation after an input change
     */
    private setEnableTapToFocus;
    /**
     * Handler to create the operation after an input change
     */
    private setGuiStyle;
    /**
     * Handler to create the operation after an input change
     */
    private setLaserArea;
    /**
     * Handler to create the operation after an input change
     */
    private setViewfinderArea;
    /**
     * Handler to create the operation after an input change
     */
    private setPaused;
    /**
     * Handler to create the operation after an input change
     */
    private setPlaySoundOnScan;
    /**
     * Handler to create the operation after an input change
     */
    private setVibrateOnScan;
    /**
     * Handler to create the operation after an input change
     */
    private setScanSettings;
    /**
     * Handler to create the operation after an input change
     */
    private setTargetScanningFPS;
    /**
     * Handler to create the operation after an input change
     */
    private setVideoFit;
    /**
     * Handler to create the operation after an input change
     */
    private setVisible;
    /**
     * Add an operation to be executed to the queue
     *
     * @param operation A promise factory function
     */
    private addToQueue;
    /**
     * Handler to create the operation after an input change
     * @returns A promise resolving when the operation queue was executed
     */
    private executeOperationQueue;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScanditSdkBarcodePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScanditSdkBarcodePickerComponent, "scandit-sdk-barcode-picker", never, { "shouldAccessCamera": { "alias": "accessCamera"; "required": false; }; "camera": { "alias": "camera"; "required": false; }; "cameraSettings": { "alias": "cameraSettings"; "required": false; }; "cameraType": { "alias": "cameraType"; "required": false; }; "enableCameraSwitcher": { "alias": "enableCameraSwitcher"; "required": false; }; "enableTorchToggle": { "alias": "enableTorchToggle"; "required": false; }; "zoom": { "alias": "zoom"; "required": false; }; "enablePinchToZoom": { "alias": "enablePinchToZoom"; "required": false; }; "mirrorImage": { "alias": "mirrorImage"; "required": false; }; "enableTapToFocus": { "alias": "enableTapToFocus"; "required": false; }; "guiStyle": { "alias": "guiStyle"; "required": false; }; "laserArea": { "alias": "laserArea"; "required": false; }; "viewfinderArea": { "alias": "viewfinderArea"; "required": false; }; "paused": { "alias": "paused"; "required": false; }; "playSoundOnScan": { "alias": "playSoundOnScan"; "required": false; }; "vibrateOnScan": { "alias": "vibrateOnScan"; "required": false; }; "scanSettings": { "alias": "scanSettings"; "required": false; }; "targetScanningFPS": { "alias": "targetScanningFPS"; "required": false; }; "videoFit": { "alias": "videoFit"; "required": false; }; "visible": { "alias": "visible"; "required": false; }; "singleImageModeSettings": { "alias": "singleImageModeSettings"; "required": false; }; }, { "scan": "scan"; "processFrame": "processFrame"; "submitFrame": "submitFrame"; "error": "error"; "init": "init"; "ready": "ready"; }, never, never, false, never>;
}
