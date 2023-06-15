import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Output, Input, ViewChild, NgModule, Inject } from '@angular/core';
import { BarcodePicker, configure } from 'scandit-sdk';

/**
 * Configuration object for library setup
 */
class ScanditSdkServiceConfig {
    /**
     * The license key to be used for configuration.
     *
     * @see https://docs.scandit.com/stable/web/index.html#configuration
     */
    licenseKey;
    /**
     * Configuration options with the following signature:
     * {
     *    engineLocation: string = "/",
     *    preloadEngine?: boolean = true,
     *    preloadBlurryRecognition?: boolean = true
     * }
     *
     * `options.engineLocation`: The location of the Scandit Engine `scandit-engine-sdk.min.js` and
     * `scandit-engine-sdk.wasm` (external WebAssembly files). You must copy the relevant files
     * to a place where they can be served from, e.g. `assets`.
     *
     * `options.preloadEngine`: _optional_. Whether to preload (download if needed, compile/instantiate
     * WebAssembly code and initialize) the external Scandit Engine library, used by BarcodePicker and Scanner
     * objects to perform scan operations.
     *
     * `options.preloadBlurryRecognition`: _optional_. Whether to preload (load or generate if needed) data needed for
     * blurry recognition as soon as possible via a separate asynchronous WebWorker thread running the Scandit Engine
     * library. Data for all symbologies is generated over time.
     *
     * @see https://docs.scandit.com/stable/web/index.html#configuration
     */
    options;
}
/**
 * Scandit SDK Service handling interaction with the Scandit SDK library, including configuration,
 * initialization and barcode picker creation
 */
class ScanditSdkService {
    config;
    /**
     * The handler to call in case of an engine load error
     */
    engineLoadErrorHandler;
    configurationPromise = Promise.resolve();
    /**
     * Initialize the service and start loading the library based on the passed config options
     *
     * @param config Configuration options
     */
    constructor(config) {
        this.config = config;
        console.debug("Loading Scandit library...");
        this.loadLibrary(config.licenseKey, config.options);
    }
    /**
     * Create a new picker in a given HTML element
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     *
     * @param element The HTML element that should contain the picker
     * @param params The parameters used for creating the picker
     * @returns A promise resolving to the created BarcodePicker
     */
    createPicker(element, params) {
        if (params == null) {
            params = {};
        }
        return this.configurationPromise.then(() => {
            return BarcodePicker.create(element, params);
        });
    }
    /**
     * Add a handler in the event of an error while loading the engine
     *
     * @param handler Function to handle an error while loading the engine
     */
    onEngineLoadError(handler) {
        this.engineLoadErrorHandler = handler;
    }
    /**
     * Configure the library and delegate error handling if needed.
     *
     * @param licenseKey The license key used for the library
     * @param options Configuration options
     * @param engineLocation The engine location
     * @param preloadEngine Whether to preload the external Scandit Engine library
     * @param preloadBlurryRecognition Whether to preload data needed for blurry recognition
     */
    loadLibrary(licenseKey, options) {
        this.configurationPromise = configure(licenseKey, options).catch(error => {
            if (this.engineLoadErrorHandler != null) {
                this.engineLoadErrorHandler(error);
            }
            else {
                alert(error);
            }
            throw error;
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkService, deps: [{ token: ScanditSdkServiceConfig }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkService, providedIn: "root" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: "root"
                }]
        }], ctorParameters: function () { return [{ type: ScanditSdkServiceConfig }]; } });

/**
 * Scandit SDK Barcode Picker Component handling camera input and scanning operations.
 */
class ScanditSdkBarcodePickerComponent {
    scanditSdkService;
    /**
     * Handle scanned barcodes via a passed ScanResult object
     *
     * See https://docs.scandit.com/stable/web/interfaces/scanresult.html
     * and https://docs.scandit.com/stable/web/classes/barcodepicker.html#onscan
     */
    scan = new EventEmitter();
    /**
     * Handle processed frames
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onprocessframe
     */
    processFrame = new EventEmitter();
    /**
     * Handle submitted frames
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onsubmitframe
     */
    submitFrame = new EventEmitter();
    /**
     * Handle errors while scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onscanerror
     */
    error = new EventEmitter();
    /**
     * Emitted when the component is initialized.
     *
     * At this moment, the picker is still being created and configured, use `(ready)` to get notified when
     * the picker is ready.
     */
    init = new EventEmitter();
    /**
     * Emitted when the picker is ready.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#onready
     */
    ready = new EventEmitter();
    /**
     * Whether there the camera should be accessed.
     *
     * Set this to false initially to create the picker without camera access.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#accesscamera
     */
    set shouldAccessCamera(newValue) {
        this._shouldAccessCamera = newValue;
        this.setShouldAccessCamera();
    }
    /**
     * The active camera
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setactivecamera
     */
    set camera(newValue) {
        this._camera = newValue;
        this.setCameraAndSettings();
    }
    /**
     * The camera settings
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#applycamerasettings
     */
    set cameraSettings(newValue) {
        this._cameraSettings = newValue;
        this.setCameraSettings();
    }
    /**
     * The initial camera type (can only be set at creation)
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     */
    set cameraType(newValue) {
        this._cameraType = newValue;
    }
    /**
     * Whether to enable the camera switcher button
     */
    set enableCameraSwitcher(newValue) {
        this._enableCameraSwitcher = newValue;
        this.setEnableCameraSwitcher();
    }
    /**
     * Whether to enable the torch toggle button
     */
    set enableTorchToggle(newValue) {
        this._enableTorchToggle = newValue;
        this.setEnableTorchToggle();
    }
    /**
     * Set the zoom level of the device
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setzoom
     */
    set zoom(newValue) {
        this._zoom = newValue;
        this.setZoomLevel();
    }
    /**
     * Whether to enable pinch to zoom on the camera preview
     */
    set enablePinchToZoom(newValue) {
        this._enablePinchToZoom = newValue;
        this.setEnablePinchToZoom();
    }
    /**
     * Whether to enable camera's video mirroring along the vertical axis
     */
    set mirrorImage(newValue) {
        this._enableMirrorImage = newValue;
        this.setImageMirrorEnabled();
    }
    /**
     * Whether to enable tap to focus on the camera preview
     */
    set enableTapToFocus(newValue) {
        this._enableTapToFocus = newValue;
        this.setEnableTapToFocus();
    }
    /**
     * Which GUI style to use for the barcode picker
     *
     * See https://docs.scandit.com/stable/web/enums/barcodepicker.guistyle.html
     * and https://docs.scandit.com/stable/web/classes/barcodepicker.html#setguistyle
     */
    set guiStyle(newValue) {
        this._guiStyle = newValue;
        this.setGuiStyle();
    }
    /**
     * Set the area of the laser displayed when the GUI style is set to laser.
     * This affects UI only.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setlaserarea
     */
    set laserArea(newValue) {
        this._laserArea = newValue;
        this.setLaserArea();
    }
    /**
     * Set the area of the viewfinder when the GUI style is set to viewfinder.
     * This affects UI only.
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setviewfinderarea
     */
    set viewfinderArea(newValue) {
        this._viewfinderArea = newValue;
        this.setViewfinderArea();
    }
    /**
     * Whether the internal scanner should be paused or not
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#pausescanning
     */
    set paused(newValue) {
        this._paused = newValue;
        this.setPaused();
    }
    /**
     * Whether there should be a sound after scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setplaysoundonscanenabled
     */
    set playSoundOnScan(newValue) {
        this._playSoundOnScan = newValue;
        this.setPlaySoundOnScan();
    }
    /**
     * Whether the device should vibrate after scanning
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvibrateonscanenabled
     */
    set vibrateOnScan(newValue) {
        this._vibrateOnScan = newValue;
        this.setVibrateOnScan();
    }
    /**
     * The scan settings to be used for the internal scanner
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#applyscansettings
     */
    set scanSettings(newValue) {
        this._scanSettings = newValue;
        this.setScanSettings();
    }
    /**
     * The target scanning FPS
     *
     *  See https://docs.scandit.com/stable/web/classes/barcodepicker.html#settargetscanningfps
     */
    set targetScanningFPS(newValue) {
        this._targetScanningFPS = newValue;
        this.setTargetScanningFPS();
    }
    /**
     * The fit of the camera preview element
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvideofit
     */
    set videoFit(newValue) {
        this._videoFit = newValue;
        this.setVideoFit();
    }
    /**
     * Whether the camera preview is visible
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#setvisible
     */
    set visible(newValue) {
        this._visible = newValue;
        this.setVisible();
    }
    /**
     * The "single image mode" settings (can only be set at creation)
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     */
    set singleImageModeSettings(newValue) {
        this._singleImageModeSettings = newValue;
    }
    /**
     * BarcodePicker reference
     */
    picker;
    /**
     * Private variable of `shouldAccessCamera`
     */
    _shouldAccessCamera = true;
    /**
     * Private variable of `camera`
     */
    _camera;
    /**
     * Private variable of `cameraSettings`
     */
    _cameraSettings;
    /**
     * Private variable of `cameraType`
     */
    _cameraType;
    /**
     * Private variable of `enableCameraSwitcher`
     */
    _enableCameraSwitcher;
    /**
     * Private variable of `enableTorchToggle`
     */
    _enableTorchToggle;
    /**
     * Private variable of `setZoomLevel`
     */
    _zoom;
    /**
     * Private variable of `enablePinchToZoom`
     */
    _enablePinchToZoom;
    /**
     * Private variable of `mirrorImage`
     */
    _enableMirrorImage = false;
    /**
     * Private variable of `enableTapToFocus`
     */
    _enableTapToFocus;
    /**
     * Private variable of `guiStyle`
     */
    _guiStyle;
    /**
     * Private variable of `laserArea`
     */
    _laserArea;
    /**
     * Private variable of `viewfinderArea`
     */
    _viewfinderArea;
    /**
     * Private variable of `paused`
     */
    _paused;
    /**
     * Private variable of `playSoundOnScan`
     */
    _playSoundOnScan;
    /**
     * Private variable of `vibrateOnScan`
     */
    _vibrateOnScan;
    /**
     * Private variable of `scanSettings`
     */
    _scanSettings;
    /**
     * Private variable of `targetScanningFPS`
     */
    _targetScanningFPS;
    /**
     * Private variable of `videoFit`
     */
    _videoFit;
    /**
     * Private variable of `visible`
     */
    _visible;
    /**
     * Private variable of `singleImageModeSettings`
     */
    _singleImageModeSettings;
    /**
     * Reference to the element containing the picker
     */
    pickerContainer;
    /**
     * A queue of operations to be executed
     *
     * As soon as a picker is available, there could be changes to the @Input properties,
     * which trigger operations to be added to this queue.
     *
     * As operations on the picker are mostly promises, this queue is executed serially
     * and should include promise factory functions.
     */
    operationQueue = [];
    /**
     * If the component is initialized yet or not
     */
    isInitialized = false;
    /**
     * Creates an instance of ScanditSdkBarcodePickerComponent.
     * @param scanditSdkService Dependency Injection for scanditSdkService
     */
    constructor(scanditSdkService) {
        this.scanditSdkService = scanditSdkService;
    }
    /**
     * Angular Lifecycle hook, on component initialization, create the picker,
     * set some callback handlers and set the proper states
     */
    ngOnInit() {
        const containerElement = this.pickerContainer.nativeElement;
        this.init.emit();
        this.scanditSdkService
            .createPicker(containerElement, {
            accessCamera: this._shouldAccessCamera,
            camera: this._camera,
            cameraSettings: this._cameraSettings,
            cameraType: this._cameraType,
            enableCameraSwitcher: this._enableCameraSwitcher,
            enablePinchToZoom: this._enablePinchToZoom,
            enableTapToFocus: this._enableTapToFocus,
            enableTorchToggle: this._enableTorchToggle,
            guiStyle: this._guiStyle,
            laserArea: this._laserArea,
            playSoundOnScan: this._playSoundOnScan,
            scanningPaused: this._paused,
            scanSettings: this._scanSettings,
            singleImageModeSettings: this._singleImageModeSettings,
            targetScanningFPS: this._targetScanningFPS,
            vibrateOnScan: this._vibrateOnScan,
            videoFit: this._videoFit,
            viewfinderArea: this._viewfinderArea,
            visible: this._visible,
        })
            .then(picker => {
            this.picker = picker;
            this.executeOperationQueue();
            this.picker.on("scan", scanResult => {
                this.scan.emit(scanResult);
            });
            this.picker.on("processFrame", scanResult => {
                this.processFrame.emit(scanResult);
            });
            this.picker.on("submitFrame", scanResult => {
                this.submitFrame.emit(scanResult);
            });
            this.picker.on("ready", () => {
                this.ready.emit();
            });
            this.picker.on("scanError", error => {
                this.error.emit(error);
            });
        });
        this.isInitialized = true;
    }
    /**
     * Angular Lifecycle hook to destroy the picker when the component is destroyed
     */
    ngOnDestroy() {
        if (this.picker != null) {
            this.picker.destroy();
        }
        else {
            this.addToQueue(() => {
                return Promise.resolve(this.ngOnDestroy());
            });
        }
    }
    /**
     * Angular Lifecycle hook to execute the operation queue after any Input property changes
     */
    ngOnChanges() {
        if (this.picker != null) {
            this.executeOperationQueue();
        }
    }
    /**
     * Handler to create the operation after an input change
     */
    setShouldAccessCamera() {
        if (this._shouldAccessCamera) {
            this.addToQueue(() => {
                return this.picker.accessCamera();
            });
        }
        else {
            this.addToQueue(() => {
                return Promise.resolve((this.paused = true));
            });
        }
    }
    /**
     * Handler to create the operation after an input change
     */
    setCameraAndSettings() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setActiveCamera(this._camera, this._cameraSettings));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setCameraSettings() {
        this.addToQueue(() => {
            return this.picker.applyCameraSettings(this._cameraSettings);
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setEnableCameraSwitcher() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setCameraSwitcherEnabled(this._enableCameraSwitcher));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setEnableTorchToggle() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setTorchToggleEnabled(this._enableTorchToggle));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setZoomLevel() {
        this.addToQueue(() => {
            return this.picker.setZoom(this._zoom);
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setEnablePinchToZoom() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setPinchToZoomEnabled(this._enablePinchToZoom));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setImageMirrorEnabled() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setMirrorImageEnabled(this._enableMirrorImage));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setEnableTapToFocus() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setTapToFocusEnabled(this._enableTapToFocus));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setGuiStyle() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setGuiStyle(this._guiStyle));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setLaserArea() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setLaserArea(this._laserArea));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setViewfinderArea() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setViewfinderArea(this._viewfinderArea));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setPaused() {
        if (this._paused) {
            this.addToQueue(() => {
                return Promise.resolve(this.picker.pauseScanning(!this._shouldAccessCamera));
            });
        }
        else {
            this.addToQueue(() => {
                return this.picker.resumeScanning();
            });
        }
    }
    /**
     * Handler to create the operation after an input change
     */
    setPlaySoundOnScan() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setPlaySoundOnScanEnabled(this._playSoundOnScan));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setVibrateOnScan() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setVibrateOnScanEnabled(this._vibrateOnScan));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setScanSettings() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.applyScanSettings(this._scanSettings));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setTargetScanningFPS() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setTargetScanningFPS(this._targetScanningFPS));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setVideoFit() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setVideoFit(this._videoFit));
        });
    }
    /**
     * Handler to create the operation after an input change
     */
    setVisible() {
        this.addToQueue(() => {
            return Promise.resolve(this.picker.setVisible(this._visible));
        });
    }
    /**
     * Add an operation to be executed to the queue
     *
     * @param operation A promise factory function
     */
    addToQueue(operation) {
        if (this.isInitialized) {
            this.operationQueue.push(operation);
        }
    }
    /**
     * Handler to create the operation after an input change
     * @returns A promise resolving when the operation queue was executed
     */
    executeOperationQueue() {
        return this.operationQueue
            .reduce((promise, func) => {
            return promise.then(() => {
                return func().then(() => {
                    const index = this.operationQueue.indexOf(func);
                    if (index > -1) {
                        this.operationQueue.splice(index, 1);
                    }
                });
            });
        }, Promise.resolve())
            .then(() => {
            if (this.operationQueue.length > 0) {
                return this.executeOperationQueue();
            }
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkBarcodePickerComponent, deps: [{ token: ScanditSdkService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: ScanditSdkBarcodePickerComponent, selector: "scandit-sdk-barcode-picker", inputs: { shouldAccessCamera: ["accessCamera", "shouldAccessCamera"], camera: "camera", cameraSettings: "cameraSettings", cameraType: "cameraType", enableCameraSwitcher: "enableCameraSwitcher", enableTorchToggle: "enableTorchToggle", zoom: "zoom", enablePinchToZoom: "enablePinchToZoom", mirrorImage: "mirrorImage", enableTapToFocus: "enableTapToFocus", guiStyle: "guiStyle", laserArea: "laserArea", viewfinderArea: "viewfinderArea", paused: "paused", playSoundOnScan: "playSoundOnScan", vibrateOnScan: "vibrateOnScan", scanSettings: "scanSettings", targetScanningFPS: "targetScanningFPS", videoFit: "videoFit", visible: "visible", singleImageModeSettings: "singleImageModeSettings" }, outputs: { scan: "scan", processFrame: "processFrame", submitFrame: "submitFrame", error: "error", init: "init", ready: "ready" }, viewQueries: [{ propertyName: "pickerContainer", first: true, predicate: ["scanditsdkbarcodepickercontainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div id="scanditsdkbarcodepickercontainer" #scanditsdkbarcodepickercontainer></div>', isInline: true, styles: [":host{display:inline-block}\n", "#scanditsdkbarcodepickercontainer{width:100%;height:100%}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkBarcodePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: "scandit-sdk-barcode-picker", template: '<div id="scanditsdkbarcodepickercontainer" #scanditsdkbarcodepickercontainer></div>', styles: [":host{display:inline-block}\n", "#scanditsdkbarcodepickercontainer{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: ScanditSdkService }]; }, propDecorators: { scan: [{
                type: Output
            }], processFrame: [{
                type: Output
            }], submitFrame: [{
                type: Output
            }], error: [{
                type: Output
            }], init: [{
                type: Output
            }], ready: [{
                type: Output
            }], shouldAccessCamera: [{
                type: Input,
                args: ["accessCamera"]
            }], camera: [{
                type: Input
            }], cameraSettings: [{
                type: Input
            }], cameraType: [{
                type: Input
            }], enableCameraSwitcher: [{
                type: Input
            }], enableTorchToggle: [{
                type: Input
            }], zoom: [{
                type: Input
            }], enablePinchToZoom: [{
                type: Input
            }], mirrorImage: [{
                type: Input
            }], enableTapToFocus: [{
                type: Input
            }], guiStyle: [{
                type: Input
            }], laserArea: [{
                type: Input
            }], viewfinderArea: [{
                type: Input
            }], paused: [{
                type: Input
            }], playSoundOnScan: [{
                type: Input
            }], vibrateOnScan: [{
                type: Input
            }], scanSettings: [{
                type: Input
            }], targetScanningFPS: [{
                type: Input
            }], videoFit: [{
                type: Input
            }], visible: [{
                type: Input
            }], singleImageModeSettings: [{
                type: Input
            }], pickerContainer: [{
                type: ViewChild,
                args: ["scanditsdkbarcodepickercontainer", { static: true }]
            }] } });

/**
 * Scandit Web SDK Module
 */
class ScanditSdkModule {
    static loaded = false;
    constructor(instance) { }
    static factory() {
        if (ScanditSdkModule.loaded) {
            throw new Error("ScanditSdkModule is already loaded. Import it in the AppModule only");
        }
        ScanditSdkModule.loaded = true;
    }
    static forRoot(licenseKey, options) {
        return {
            ngModule: ScanditSdkModule,
            providers: [
                {
                    provide: "ScanditSdkModuleInstance",
                    useFactory: ScanditSdkModule.factory
                },
                {
                    provide: ScanditSdkServiceConfig,
                    useValue: {
                        licenseKey,
                        options
                    }
                }
            ]
        };
    }
    static forChild() {
        return {
            ngModule: ScanditSdkModule,
            providers: []
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkModule, deps: [{ token: "ScanditSdkModuleInstance" }], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkModule, declarations: [ScanditSdkBarcodePickerComponent], exports: [ScanditSdkBarcodePickerComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ScanditSdkBarcodePickerComponent],
                    exports: [ScanditSdkBarcodePickerComponent]
                }]
        }], ctorParameters: function () { return [{ type: ScanditSdkModule, decorators: [{
                    type: Inject,
                    args: ["ScanditSdkModuleInstance"]
                }] }]; } });

/*
 * Public API Surface of scandit-sdk-angular
 */
// tslint:disable-next-line:missing-jsdoc

/**
 * Generated bundle index. Do not edit.
 */

export { ScanditSdkBarcodePickerComponent, ScanditSdkModule, ScanditSdkService, ScanditSdkServiceConfig };
//# sourceMappingURL=scandit-sdk-angular.mjs.map
