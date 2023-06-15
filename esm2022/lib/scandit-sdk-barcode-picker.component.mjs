import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "./scandit-sdk.service";
/**
 * Scandit SDK Barcode Picker Component handling camera input and scanning operations.
 */
export class ScanditSdkBarcodePickerComponent {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkBarcodePickerComponent, deps: [{ token: i1.ScanditSdkService }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.1.1", type: ScanditSdkBarcodePickerComponent, selector: "scandit-sdk-barcode-picker", inputs: { shouldAccessCamera: ["accessCamera", "shouldAccessCamera"], camera: "camera", cameraSettings: "cameraSettings", cameraType: "cameraType", enableCameraSwitcher: "enableCameraSwitcher", enableTorchToggle: "enableTorchToggle", zoom: "zoom", enablePinchToZoom: "enablePinchToZoom", mirrorImage: "mirrorImage", enableTapToFocus: "enableTapToFocus", guiStyle: "guiStyle", laserArea: "laserArea", viewfinderArea: "viewfinderArea", paused: "paused", playSoundOnScan: "playSoundOnScan", vibrateOnScan: "vibrateOnScan", scanSettings: "scanSettings", targetScanningFPS: "targetScanningFPS", videoFit: "videoFit", visible: "visible", singleImageModeSettings: "singleImageModeSettings" }, outputs: { scan: "scan", processFrame: "processFrame", submitFrame: "submitFrame", error: "error", init: "init", ready: "ready" }, viewQueries: [{ propertyName: "pickerContainer", first: true, predicate: ["scanditsdkbarcodepickercontainer"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: '<div id="scanditsdkbarcodepickercontainer" #scanditsdkbarcodepickercontainer></div>', isInline: true, styles: [":host{display:inline-block}\n", "#scanditsdkbarcodepickercontainer{width:100%;height:100%}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: ScanditSdkBarcodePickerComponent, decorators: [{
            type: Component,
            args: [{ selector: "scandit-sdk-barcode-picker", template: '<div id="scanditsdkbarcodepickercontainer" #scanditsdkbarcodepickercontainer></div>', styles: [":host{display:inline-block}\n", "#scanditsdkbarcodepickercontainer{width:100%;height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.ScanditSdkService }]; }, propDecorators: { scan: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbmRpdC1zZGstYmFyY29kZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zY2FuZGl0LXNkay1iYXJjb2RlLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFhaEg7O0dBRUc7QUFNSCxNQUFNLE9BQU8sZ0NBQWdDO0lBK1hkO0lBOVg3Qjs7Ozs7T0FLRztJQUNjLElBQUksR0FBNkIsSUFBSSxZQUFZLEVBQWMsQ0FBQztJQUVqRjs7OztPQUlHO0lBQ2MsWUFBWSxHQUE2QixJQUFJLFlBQVksRUFBYyxDQUFDO0lBRXpGOzs7O09BSUc7SUFDYyxXQUFXLEdBQTZCLElBQUksWUFBWSxFQUFjLENBQUM7SUFFeEY7Ozs7T0FJRztJQUNjLEtBQUssR0FBd0IsSUFBSSxZQUFZLEVBQVMsQ0FBQztJQUV4RTs7Ozs7T0FLRztJQUNjLElBQUksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztJQUVyRTs7OztPQUlHO0lBQ2MsS0FBSyxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO0lBRXRFOzs7Ozs7T0FNRztJQUNILElBQW1DLGtCQUFrQixDQUFDLFFBQWlCO1FBQ3JFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFxQixNQUFNLENBQUMsUUFBZ0I7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDeEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFxQixjQUFjLENBQUMsUUFBd0I7UUFDMUQsSUFBSSxDQUFD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QUE1QixLQUFLO2dCQVdlLFNBQVM7c0JBQTdCLEtBQUs7Z0JBV2UsY0FBYztzQkFBbEMsS0FBSztnQkFVZSxNQUFNO3NCQUExQixLQUFLO2dCQVVlLGVBQWU7c0JBQW5DLEtBQUs7Z0JBVWUsYUFBYTtzQkFBakMsS0FBSztnQkFVZSxZQUFZO3NCQUFoQyxLQUFLO2dCQVVlLGlCQUFpQjtzQkFBckMsS0FBSztnQkFVZSxRQUFRO3NCQUE1QixLQUFLO2dCQVVlLE9BQU87c0JBQTNCLEtBQUs7Z0JBVWUsdUJBQXVCO3NCQUEzQyxLQUFLO2dCQXFINEUsZUFBZTtzQkFBaEcsU0FBUzt1QkFBQyxrQ0FBa0MsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIEJhcmNvZGVQaWNrZXIsXG4gIENhbWVyYSxcbiAgQ2FtZXJhU2V0dGluZ3MsXG4gIFNjYW5SZXN1bHQsXG4gIFNjYW5TZXR0aW5ncyxcbiAgU2VhcmNoQXJlYSxcbiAgU2luZ2xlSW1hZ2VNb2RlU2V0dGluZ3Ncbn0gZnJvbSBcInNjYW5kaXQtc2RrXCI7XG5cbmltcG9ydCB7IFNjYW5kaXRTZGtTZXJ2aWNlIH0gZnJvbSBcIi4vc2NhbmRpdC1zZGsuc2VydmljZVwiO1xuXG4vKipcbiAqIFNjYW5kaXQgU0RLIEJhcmNvZGUgUGlja2VyIENvbXBvbmVudCBoYW5kbGluZyBjYW1lcmEgaW5wdXQgYW5kIHNjYW5uaW5nIG9wZXJhdGlvbnMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzY2FuZGl0LXNkay1iYXJjb2RlLXBpY2tlclwiLFxuICB0ZW1wbGF0ZTogJzxkaXYgaWQ9XCJzY2FuZGl0c2RrYmFyY29kZXBpY2tlcmNvbnRhaW5lclwiICNzY2FuZGl0c2RrYmFyY29kZXBpY2tlcmNvbnRhaW5lcj48L2Rpdj4nLFxuICBzdHlsZXM6IFtcIjpob3N0IHsgZGlzcGxheTogaW5saW5lLWJsb2NrIH1cIiwgXCIjc2NhbmRpdHNka2JhcmNvZGVwaWNrZXJjb250YWluZXIgeyB3aWR0aDogMTAwJTsgaGVpZ2h0OjEwMCU7IH1cIl1cbn0pXG5leHBvcnQgY2xhc3MgU2NhbmRpdFNka0JhcmNvZGVQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgLyoqXG4gICAqIEhhbmRsZSBzY2FubmVkIGJhcmNvZGVzIHZpYSBhIHBhc3NlZCBTY2FuUmVzdWx0IG9iamVjdFxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvaW50ZXJmYWNlcy9zY2FucmVzdWx0Lmh0bWxcbiAgICogYW5kIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI29uc2NhblxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyBzY2FuOiBFdmVudEVtaXR0ZXI8U2NhblJlc3VsdD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNjYW5SZXN1bHQ+KCk7XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBwcm9jZXNzZWQgZnJhbWVzXG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNvbnByb2Nlc3NmcmFtZVxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyBwcm9jZXNzRnJhbWU6IEV2ZW50RW1pdHRlcjxTY2FuUmVzdWx0PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2NhblJlc3VsdD4oKTtcblxuICAvKipcbiAgICogSGFuZGxlIHN1Ym1pdHRlZCBmcmFtZXNcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI29uc3VibWl0ZnJhbWVcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgc3VibWl0RnJhbWU6IEV2ZW50RW1pdHRlcjxTY2FuUmVzdWx0PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2NhblJlc3VsdD4oKTtcblxuICAvKipcbiAgICogSGFuZGxlIGVycm9ycyB3aGlsZSBzY2FubmluZ1xuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjb25zY2FuZXJyb3JcbiAgICovXG4gIEBPdXRwdXQoKSBwdWJsaWMgZXJyb3I6IEV2ZW50RW1pdHRlcjxFcnJvcj4gPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0dGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZC5cbiAgICpcbiAgICogQXQgdGhpcyBtb21lbnQsIHRoZSBwaWNrZXIgaXMgc3RpbGwgYmVpbmcgY3JlYXRlZCBhbmQgY29uZmlndXJlZCwgdXNlIGAocmVhZHkpYCB0byBnZXQgbm90aWZpZWQgd2hlblxuICAgKiB0aGUgcGlja2VyIGlzIHJlYWR5LlxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyBpbml0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXR0ZWQgd2hlbiB0aGUgcGlja2VyIGlzIHJlYWR5LlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjb25yZWFkeVxuICAgKi9cbiAgQE91dHB1dCgpIHB1YmxpYyByZWFkeTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZXJlIHRoZSBjYW1lcmEgc2hvdWxkIGJlIGFjY2Vzc2VkLlxuICAgKlxuICAgKiBTZXQgdGhpcyB0byBmYWxzZSBpbml0aWFsbHkgdG8gY3JlYXRlIHRoZSBwaWNrZXIgd2l0aG91dCBjYW1lcmEgYWNjZXNzLlxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjYWNjZXNzY2FtZXJhXG4gICAqL1xuICBASW5wdXQoXCJhY2Nlc3NDYW1lcmFcIikgcHJpdmF0ZSBzZXQgc2hvdWxkQWNjZXNzQ2FtZXJhKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvdWxkQWNjZXNzQ2FtZXJhID0gbmV3VmFsdWU7XG4gICAgdGhpcy5zZXRTaG91bGRBY2Nlc3NDYW1lcmEoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWN0aXZlIGNhbWVyYVxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjc2V0YWN0aXZlY2FtZXJhXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCBjYW1lcmEobmV3VmFsdWU6IENhbWVyYSkge1xuICAgIHRoaXMuX2NhbWVyYSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0Q2FtZXJhQW5kU2V0dGluZ3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY2FtZXJhIHNldHRpbmdzXG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNhcHBseWNhbWVyYXNldHRpbmdzXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCBjYW1lcmFTZXR0aW5ncyhuZXdWYWx1ZTogQ2FtZXJhU2V0dGluZ3MpIHtcbiAgICB0aGlzLl9jYW1lcmFTZXR0aW5ncyA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0Q2FtZXJhU2V0dGluZ3MoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5pdGlhbCBjYW1lcmEgdHlwZSAoY2FuIG9ubHkgYmUgc2V0IGF0IGNyZWF0aW9uKVxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjY3JlYXRlXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCBjYW1lcmFUeXBlKG5ld1ZhbHVlOiBDYW1lcmEuVHlwZSkge1xuICAgIHRoaXMuX2NhbWVyYVR5cGUgPSBuZXdWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSB0aGUgY2FtZXJhIHN3aXRjaGVyIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgZW5hYmxlQ2FtZXJhU3dpdGNoZXIobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lbmFibGVDYW1lcmFTd2l0Y2hlciA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0RW5hYmxlQ2FtZXJhU3dpdGNoZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSB0aGUgdG9yY2ggdG9nZ2xlIGJ1dHRvblxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgZW5hYmxlVG9yY2hUb2dnbGUobmV3VmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9lbmFibGVUb3JjaFRvZ2dsZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0RW5hYmxlVG9yY2hUb2dnbGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHpvb20gbGV2ZWwgb2YgdGhlIGRldmljZVxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjc2V0em9vbVxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgem9vbShuZXdWYWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fem9vbSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0Wm9vbUxldmVsKCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0byBlbmFibGUgcGluY2ggdG8gem9vbSBvbiB0aGUgY2FtZXJhIHByZXZpZXdcbiAgICovXG4gIEBJbnB1dCgpIHByaXZhdGUgc2V0IGVuYWJsZVBpbmNoVG9ab29tKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZW5hYmxlUGluY2hUb1pvb20gPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnNldEVuYWJsZVBpbmNoVG9ab29tKCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0byBlbmFibGUgY2FtZXJhJ3MgdmlkZW8gbWlycm9yaW5nIGFsb25nIHRoZSB2ZXJ0aWNhbCBheGlzXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCBtaXJyb3JJbWFnZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2VuYWJsZU1pcnJvckltYWdlID0gbmV3VmFsdWU7XG4gICAgdGhpcy5zZXRJbWFnZU1pcnJvckVuYWJsZWQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSB0YXAgdG8gZm9jdXMgb24gdGhlIGNhbWVyYSBwcmV2aWV3XG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCBlbmFibGVUYXBUb0ZvY3VzKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZW5hYmxlVGFwVG9Gb2N1cyA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0RW5hYmxlVGFwVG9Gb2N1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoaWNoIEdVSSBzdHlsZSB0byB1c2UgZm9yIHRoZSBiYXJjb2RlIHBpY2tlclxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvZW51bXMvYmFyY29kZXBpY2tlci5ndWlzdHlsZS5odG1sXG4gICAqIGFuZCBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNzZXRndWlzdHlsZVxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgZ3VpU3R5bGUobmV3VmFsdWU6IEJhcmNvZGVQaWNrZXIuR3VpU3R5bGUpIHtcbiAgICB0aGlzLl9ndWlTdHlsZSA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0R3VpU3R5bGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGFyZWEgb2YgdGhlIGxhc2VyIGRpc3BsYXllZCB3aGVuIHRoZSBHVUkgc3R5bGUgaXMgc2V0IHRvIGxhc2VyLlxuICAgKiBUaGlzIGFmZmVjdHMgVUkgb25seS5cbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI3NldGxhc2VyYXJlYVxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgbGFzZXJBcmVhKG5ld1ZhbHVlOiBTZWFyY2hBcmVhKSB7XG4gICAgdGhpcy5fbGFzZXJBcmVhID0gbmV3VmFsdWU7XG4gICAgdGhpcy5zZXRMYXNlckFyZWEoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGFyZWEgb2YgdGhlIHZpZXdmaW5kZXIgd2hlbiB0aGUgR1VJIHN0eWxlIGlzIHNldCB0byB2aWV3ZmluZGVyLlxuICAgKiBUaGlzIGFmZmVjdHMgVUkgb25seS5cbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI3NldHZpZXdmaW5kZXJhcmVhXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCB2aWV3ZmluZGVyQXJlYShuZXdWYWx1ZTogU2VhcmNoQXJlYSkge1xuICAgIHRoaXMuX3ZpZXdmaW5kZXJBcmVhID0gbmV3VmFsdWU7XG4gICAgdGhpcy5zZXRWaWV3ZmluZGVyQXJlYSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGludGVybmFsIHNjYW5uZXIgc2hvdWxkIGJlIHBhdXNlZCBvciBub3RcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI3BhdXNlc2Nhbm5pbmdcbiAgICovXG4gIEBJbnB1dCgpIHByaXZhdGUgc2V0IHBhdXNlZChuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3BhdXNlZCA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0UGF1c2VkKCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGVyZSBzaG91bGQgYmUgYSBzb3VuZCBhZnRlciBzY2FubmluZ1xuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjc2V0cGxheXNvdW5kb25zY2FuZW5hYmxlZFxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgcGxheVNvdW5kT25TY2FuKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcGxheVNvdW5kT25TY2FuID0gbmV3VmFsdWU7XG4gICAgdGhpcy5zZXRQbGF5U291bmRPblNjYW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBkZXZpY2Ugc2hvdWxkIHZpYnJhdGUgYWZ0ZXIgc2Nhbm5pbmdcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZG9jcy5zY2FuZGl0LmNvbS9zdGFibGUvd2ViL2NsYXNzZXMvYmFyY29kZXBpY2tlci5odG1sI3NldHZpYnJhdGVvbnNjYW5lbmFibGVkXG4gICAqL1xuICBASW5wdXQoKSBwcml2YXRlIHNldCB2aWJyYXRlT25TY2FuKG5ld1ZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fdmlicmF0ZU9uU2NhbiA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0VmlicmF0ZU9uU2NhbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBzY2FuIHNldHRpbmdzIHRvIGJlIHVzZWQgZm9yIHRoZSBpbnRlcm5hbCBzY2FubmVyXG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNhcHBseXNjYW5zZXR0aW5nc1xuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgc2NhblNldHRpbmdzKG5ld1ZhbHVlOiBTY2FuU2V0dGluZ3MpIHtcbiAgICB0aGlzLl9zY2FuU2V0dGluZ3MgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnNldFNjYW5TZXR0aW5ncygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0YXJnZXQgc2Nhbm5pbmcgRlBTXG4gICAqXG4gICAqICBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjc2V0dGFyZ2V0c2Nhbm5pbmdmcHNcbiAgICovXG4gIEBJbnB1dCgpIHByaXZhdGUgc2V0IHRhcmdldFNjYW5uaW5nRlBTKG5ld1ZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLl90YXJnZXRTY2FubmluZ0ZQUyA9IG5ld1ZhbHVlO1xuICAgIHRoaXMuc2V0VGFyZ2V0U2Nhbm5pbmdGUFMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZml0IG9mIHRoZSBjYW1lcmEgcHJldmlldyBlbGVtZW50XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNzZXR2aWRlb2ZpdFxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgdmlkZW9GaXQobmV3VmFsdWU6IEJhcmNvZGVQaWNrZXIuT2JqZWN0Rml0KSB7XG4gICAgdGhpcy5fdmlkZW9GaXQgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnNldFZpZGVvRml0KCk7XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2FtZXJhIHByZXZpZXcgaXMgdmlzaWJsZVxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvY2xhc3Nlcy9iYXJjb2RlcGlja2VyLmh0bWwjc2V0dmlzaWJsZVxuICAgKi9cbiAgQElucHV0KCkgcHJpdmF0ZSBzZXQgdmlzaWJsZShuZXdWYWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Zpc2libGUgPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnNldFZpc2libGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgXCJzaW5nbGUgaW1hZ2UgbW9kZVwiIHNldHRpbmdzIChjYW4gb25seSBiZSBzZXQgYXQgY3JlYXRpb24pXG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNjcmVhdGVcbiAgICovXG4gIEBJbnB1dCgpIHByaXZhdGUgc2V0IHNpbmdsZUltYWdlTW9kZVNldHRpbmdzKG5ld1ZhbHVlOiBTaW5nbGVJbWFnZU1vZGVTZXR0aW5ncykge1xuICAgIHRoaXMuX3NpbmdsZUltYWdlTW9kZVNldHRpbmdzID0gbmV3VmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQmFyY29kZVBpY2tlciByZWZlcmVuY2VcbiAgICovXG4gIHByaXZhdGUgcGlja2VyOiBCYXJjb2RlUGlja2VyO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBzaG91bGRBY2Nlc3NDYW1lcmFgXG4gICAqL1xuICBwcml2YXRlIF9zaG91bGRBY2Nlc3NDYW1lcmE6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBjYW1lcmFgXG4gICAqL1xuICBwcml2YXRlIF9jYW1lcmE6IENhbWVyYTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgY2FtZXJhU2V0dGluZ3NgXG4gICAqL1xuICBwcml2YXRlIF9jYW1lcmFTZXR0aW5nczogQ2FtZXJhU2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYGNhbWVyYVR5cGVgXG4gICAqL1xuICBwcml2YXRlIF9jYW1lcmFUeXBlOiBDYW1lcmEuVHlwZTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgZW5hYmxlQ2FtZXJhU3dpdGNoZXJgXG4gICAqL1xuICBwcml2YXRlIF9lbmFibGVDYW1lcmFTd2l0Y2hlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgZW5hYmxlVG9yY2hUb2dnbGVgXG4gICAqL1xuICBwcml2YXRlIF9lbmFibGVUb3JjaFRvZ2dsZTogYm9vbGVhbjtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgc2V0Wm9vbUxldmVsYFxuICAgKi9cbiAgcHJpdmF0ZSBfem9vbTogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBlbmFibGVQaW5jaFRvWm9vbWBcbiAgICovXG4gIHByaXZhdGUgX2VuYWJsZVBpbmNoVG9ab29tOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBtaXJyb3JJbWFnZWBcbiAgICovXG4gIHByaXZhdGUgX2VuYWJsZU1pcnJvckltYWdlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYGVuYWJsZVRhcFRvRm9jdXNgXG4gICAqL1xuICBwcml2YXRlIF9lbmFibGVUYXBUb0ZvY3VzOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBndWlTdHlsZWBcbiAgICovXG4gIHByaXZhdGUgX2d1aVN0eWxlOiBCYXJjb2RlUGlja2VyLkd1aVN0eWxlO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBsYXNlckFyZWFgXG4gICAqL1xuICBwcml2YXRlIF9sYXNlckFyZWE6IFNlYXJjaEFyZWEgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYHZpZXdmaW5kZXJBcmVhYFxuICAgKi9cbiAgcHJpdmF0ZSBfdmlld2ZpbmRlckFyZWE6IFNlYXJjaEFyZWEgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYHBhdXNlZGBcbiAgICovXG4gIHByaXZhdGUgX3BhdXNlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgcGxheVNvdW5kT25TY2FuYFxuICAgKi9cbiAgcHJpdmF0ZSBfcGxheVNvdW5kT25TY2FuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGB2aWJyYXRlT25TY2FuYFxuICAgKi9cbiAgcHJpdmF0ZSBfdmlicmF0ZU9uU2NhbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgc2NhblNldHRpbmdzYFxuICAgKi9cbiAgcHJpdmF0ZSBfc2NhblNldHRpbmdzOiBTY2FuU2V0dGluZ3M7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYHRhcmdldFNjYW5uaW5nRlBTYFxuICAgKi9cbiAgcHJpdmF0ZSBfdGFyZ2V0U2Nhbm5pbmdGUFM6IG51bWJlcjtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZSBvZiBgdmlkZW9GaXRgXG4gICAqL1xuICBwcml2YXRlIF92aWRlb0ZpdDogQmFyY29kZVBpY2tlci5PYmplY3RGaXQ7XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGUgb2YgYHZpc2libGVgXG4gICAqL1xuICBwcml2YXRlIF92aXNpYmxlOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlIG9mIGBzaW5nbGVJbWFnZU1vZGVTZXR0aW5nc2BcbiAgICovXG4gIHByaXZhdGUgX3NpbmdsZUltYWdlTW9kZVNldHRpbmdzOiBTaW5nbGVJbWFnZU1vZGVTZXR0aW5ncztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIHBpY2tlclxuICAgKi9cbiAgQFZpZXdDaGlsZChcInNjYW5kaXRzZGtiYXJjb2RlcGlja2VyY29udGFpbmVyXCIsIHsgc3RhdGljOiB0cnVlIH0pIHByaXZhdGUgcmVhZG9ubHkgcGlja2VyQ29udGFpbmVyOiBhbnk7XG5cbiAgLyoqXG4gICAqIEEgcXVldWUgb2Ygb3BlcmF0aW9ucyB0byBiZSBleGVjdXRlZFxuICAgKlxuICAgKiBBcyBzb29uIGFzIGEgcGlja2VyIGlzIGF2YWlsYWJsZSwgdGhlcmUgY291bGQgYmUgY2hhbmdlcyB0byB0aGUgQElucHV0IHByb3BlcnRpZXMsXG4gICAqIHdoaWNoIHRyaWdnZXIgb3BlcmF0aW9ucyB0byBiZSBhZGRlZCB0byB0aGlzIHF1ZXVlLlxuICAgKlxuICAgKiBBcyBvcGVyYXRpb25zIG9uIHRoZSBwaWNrZXIgYXJlIG1vc3RseSBwcm9taXNlcywgdGhpcyBxdWV1ZSBpcyBleGVjdXRlZCBzZXJpYWxseVxuICAgKiBhbmQgc2hvdWxkIGluY2x1ZGUgcHJvbWlzZSBmYWN0b3J5IGZ1bmN0aW9ucy5cbiAgICovXG4gIHByaXZhdGUgcmVhZG9ubHkgb3BlcmF0aW9uUXVldWU6ICgoKSA9PiBQcm9taXNlPGFueT4pW10gPSBbXTtcblxuICAvKipcbiAgICogSWYgdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCB5ZXQgb3Igbm90XG4gICAqL1xuICBwcml2YXRlIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTY2FuZGl0U2RrQmFyY29kZVBpY2tlckNvbXBvbmVudC5cbiAgICogQHBhcmFtIHNjYW5kaXRTZGtTZXJ2aWNlIERlcGVuZGVuY3kgSW5qZWN0aW9uIGZvciBzY2FuZGl0U2RrU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzY2FuZGl0U2RrU2VydmljZTogU2NhbmRpdFNka1NlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIgTGlmZWN5Y2xlIGhvb2ssIG9uIGNvbXBvbmVudCBpbml0aWFsaXphdGlvbiwgY3JlYXRlIHRoZSBwaWNrZXIsXG4gICAqIHNldCBzb21lIGNhbGxiYWNrIGhhbmRsZXJzIGFuZCBzZXQgdGhlIHByb3BlciBzdGF0ZXNcbiAgICovXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdGhpcy5waWNrZXJDb250YWluZXIubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmluaXQuZW1pdCgpO1xuXG4gICAgdGhpcy5zY2FuZGl0U2RrU2VydmljZVxuICAgICAgLmNyZWF0ZVBpY2tlcihjb250YWluZXJFbGVtZW50LCB7XG4gICAgICAgIGFjY2Vzc0NhbWVyYTogdGhpcy5fc2hvdWxkQWNjZXNzQ2FtZXJhLFxuICAgICAgICBjYW1lcmE6IHRoaXMuX2NhbWVyYSxcbiAgICAgICAgY2FtZXJhU2V0dGluZ3M6IHRoaXMuX2NhbWVyYVNldHRpbmdzLFxuICAgICAgICBjYW1lcmFUeXBlOiB0aGlzLl9jYW1lcmFUeXBlLFxuICAgICAgICBlbmFibGVDYW1lcmFTd2l0Y2hlcjogdGhpcy5fZW5hYmxlQ2FtZXJhU3dpdGNoZXIsXG4gICAgICAgIGVuYWJsZVBpbmNoVG9ab29tOiB0aGlzLl9lbmFibGVQaW5jaFRvWm9vbSxcbiAgICAgICAgZW5hYmxlVGFwVG9Gb2N1czogdGhpcy5fZW5hYmxlVGFwVG9Gb2N1cyxcbiAgICAgICAgZW5hYmxlVG9yY2hUb2dnbGU6IHRoaXMuX2VuYWJsZVRvcmNoVG9nZ2xlLFxuICAgICAgICBndWlTdHlsZTogdGhpcy5fZ3VpU3R5bGUsXG4gICAgICAgIGxhc2VyQXJlYTogdGhpcy5fbGFzZXJBcmVhLFxuICAgICAgICBwbGF5U291bmRPblNjYW46IHRoaXMuX3BsYXlTb3VuZE9uU2NhbixcbiAgICAgICAgc2Nhbm5pbmdQYXVzZWQ6IHRoaXMuX3BhdXNlZCxcbiAgICAgICAgc2NhblNldHRpbmdzOiB0aGlzLl9zY2FuU2V0dGluZ3MsXG4gICAgICAgIHNpbmdsZUltYWdlTW9kZVNldHRpbmdzOiB0aGlzLl9zaW5nbGVJbWFnZU1vZGVTZXR0aW5ncyxcbiAgICAgICAgdGFyZ2V0U2Nhbm5pbmdGUFM6IHRoaXMuX3RhcmdldFNjYW5uaW5nRlBTLFxuICAgICAgICB2aWJyYXRlT25TY2FuOiB0aGlzLl92aWJyYXRlT25TY2FuLFxuICAgICAgICB2aWRlb0ZpdDogdGhpcy5fdmlkZW9GaXQsXG4gICAgICAgIHZpZXdmaW5kZXJBcmVhOiB0aGlzLl92aWV3ZmluZGVyQXJlYSxcbiAgICAgICAgdmlzaWJsZTogdGhpcy5fdmlzaWJsZSxcbiAgICAgIH0pXG4gICAgICAudGhlbihwaWNrZXIgPT4ge1xuICAgICAgICB0aGlzLnBpY2tlciA9IHBpY2tlcjtcbiAgICAgICAgdGhpcy5leGVjdXRlT3BlcmF0aW9uUXVldWUoKTtcbiAgICAgICAgdGhpcy5waWNrZXIub24oXCJzY2FuXCIsIHNjYW5SZXN1bHQgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nhbi5lbWl0KHNjYW5SZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5waWNrZXIub24oXCJwcm9jZXNzRnJhbWVcIiwgc2NhblJlc3VsdCA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzRnJhbWUuZW1pdChzY2FuUmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGlja2VyLm9uKFwic3VibWl0RnJhbWVcIiwgc2NhblJlc3VsdCA9PiB7XG4gICAgICAgICAgdGhpcy5zdWJtaXRGcmFtZS5lbWl0KHNjYW5SZXN1bHQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5waWNrZXIub24oXCJyZWFkeVwiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWFkeS5lbWl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBpY2tlci5vbihcInNjYW5FcnJvclwiLCBlcnJvciA9PiB7XG4gICAgICAgICAgdGhpcy5lcnJvci5lbWl0KGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQW5ndWxhciBMaWZlY3ljbGUgaG9vayB0byBkZXN0cm95IHRoZSBwaWNrZXIgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZFxuICAgKi9cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBpY2tlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLnBpY2tlci5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5uZ09uRGVzdHJveSgpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbmd1bGFyIExpZmVjeWNsZSBob29rIHRvIGV4ZWN1dGUgdGhlIG9wZXJhdGlvbiBxdWV1ZSBhZnRlciBhbnkgSW5wdXQgcHJvcGVydHkgY2hhbmdlc1xuICAgKi9cbiAgcHVibGljIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBpY2tlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmV4ZWN1dGVPcGVyYXRpb25RdWV1ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTaG91bGRBY2Nlc3NDYW1lcmEoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Nob3VsZEFjY2Vzc0NhbWVyYSkge1xuICAgICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlja2VyLmFjY2Vzc0NhbWVyYSgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKHRoaXMucGF1c2VkID0gdHJ1ZSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldENhbWVyYUFuZFNldHRpbmdzKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGlja2VyLnNldEFjdGl2ZUNhbWVyYSh0aGlzLl9jYW1lcmEsIHRoaXMuX2NhbWVyYVNldHRpbmdzKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byBjcmVhdGUgdGhlIG9wZXJhdGlvbiBhZnRlciBhbiBpbnB1dCBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgc2V0Q2FtZXJhU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnBpY2tlci5hcHBseUNhbWVyYVNldHRpbmdzKHRoaXMuX2NhbWVyYVNldHRpbmdzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRFbmFibGVDYW1lcmFTd2l0Y2hlcigpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRDYW1lcmFTd2l0Y2hlckVuYWJsZWQodGhpcy5fZW5hYmxlQ2FtZXJhU3dpdGNoZXIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRFbmFibGVUb3JjaFRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRUb3JjaFRvZ2dsZUVuYWJsZWQodGhpcy5fZW5hYmxlVG9yY2hUb2dnbGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRab29tTGV2ZWwoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnBpY2tlci5zZXRab29tKHRoaXMuX3pvb20pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldEVuYWJsZVBpbmNoVG9ab29tKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGlja2VyLnNldFBpbmNoVG9ab29tRW5hYmxlZCh0aGlzLl9lbmFibGVQaW5jaFRvWm9vbSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldEltYWdlTWlycm9yRW5hYmxlZCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRNaXJyb3JJbWFnZUVuYWJsZWQodGhpcy5fZW5hYmxlTWlycm9ySW1hZ2UpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRFbmFibGVUYXBUb0ZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGlja2VyLnNldFRhcFRvRm9jdXNFbmFibGVkKHRoaXMuX2VuYWJsZVRhcFRvRm9jdXMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRHdWlTdHlsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRHdWlTdHlsZSh0aGlzLl9ndWlTdHlsZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldExhc2VyQXJlYSgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRMYXNlckFyZWEodGhpcy5fbGFzZXJBcmVhKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byBjcmVhdGUgdGhlIG9wZXJhdGlvbiBhZnRlciBhbiBpbnB1dCBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgc2V0Vmlld2ZpbmRlckFyZWEoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5waWNrZXIuc2V0Vmlld2ZpbmRlckFyZWEodGhpcy5fdmlld2ZpbmRlckFyZWEpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRQYXVzZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhdXNlZCkge1xuICAgICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5wYXVzZVNjYW5uaW5nKCF0aGlzLl9zaG91bGRBY2Nlc3NDYW1lcmEpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrZXIucmVzdW1lU2Nhbm5pbmcoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRQbGF5U291bmRPblNjYW4oKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5waWNrZXIuc2V0UGxheVNvdW5kT25TY2FuRW5hYmxlZCh0aGlzLl9wbGF5U291bmRPblNjYW4pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRWaWJyYXRlT25TY2FuKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkVG9RdWV1ZSgoKSA9PiB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMucGlja2VyLnNldFZpYnJhdGVPblNjYW5FbmFibGVkKHRoaXMuX3ZpYnJhdGVPblNjYW4pKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRTY2FuU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5waWNrZXIuYXBwbHlTY2FuU2V0dGluZ3ModGhpcy5fc2NhblNldHRpbmdzKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlciB0byBjcmVhdGUgdGhlIG9wZXJhdGlvbiBhZnRlciBhbiBpbnB1dCBjaGFuZ2VcbiAgICovXG4gIHByaXZhdGUgc2V0VGFyZ2V0U2Nhbm5pbmdGUFMoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5waWNrZXIuc2V0VGFyZ2V0U2Nhbm5pbmdGUFModGhpcy5fdGFyZ2V0U2Nhbm5pbmdGUFMpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVyIHRvIGNyZWF0ZSB0aGUgb3BlcmF0aW9uIGFmdGVyIGFuIGlucHV0IGNoYW5nZVxuICAgKi9cbiAgcHJpdmF0ZSBzZXRWaWRlb0ZpdCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvUXVldWUoKCkgPT4ge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnBpY2tlci5zZXRWaWRlb0ZpdCh0aGlzLl92aWRlb0ZpdCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqL1xuICBwcml2YXRlIHNldFZpc2libGUoKTogdm9pZCB7XG4gICAgdGhpcy5hZGRUb1F1ZXVlKCgpID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5waWNrZXIuc2V0VmlzaWJsZSh0aGlzLl92aXNpYmxlKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGFuIG9wZXJhdGlvbiB0byBiZSBleGVjdXRlZCB0byB0aGUgcXVldWVcbiAgICpcbiAgICogQHBhcmFtIG9wZXJhdGlvbiBBIHByb21pc2UgZmFjdG9yeSBmdW5jdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhZGRUb1F1ZXVlKG9wZXJhdGlvbjogKCkgPT4gUHJvbWlzZTxhbnk+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgdGhpcy5vcGVyYXRpb25RdWV1ZS5wdXNoKG9wZXJhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXIgdG8gY3JlYXRlIHRoZSBvcGVyYXRpb24gYWZ0ZXIgYW4gaW5wdXQgY2hhbmdlXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgd2hlbiB0aGUgb3BlcmF0aW9uIHF1ZXVlIHdhcyBleGVjdXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBleGVjdXRlT3BlcmF0aW9uUXVldWUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uUXVldWVcbiAgICAgIC5yZWR1Y2UoKHByb21pc2UsIGZ1bmMpID0+IHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4OiBudW1iZXIgPSB0aGlzLm9wZXJhdGlvblF1ZXVlLmluZGV4T2YoZnVuYyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICB0aGlzLm9wZXJhdGlvblF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSwgUHJvbWlzZS5yZXNvbHZlKCkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLm9wZXJhdGlvblF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlT3BlcmF0aW9uUXVldWUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==