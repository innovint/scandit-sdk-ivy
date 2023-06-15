import { BarcodePicker } from "scandit-sdk";
import * as i0 from "@angular/core";
/**
 * Configuration object for library setup
 */
export declare class ScanditSdkServiceConfig {
    /**
     * The license key to be used for configuration.
     *
     * @see https://docs.scandit.com/stable/web/index.html#configuration
     */
    licenseKey: string;
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
    options: {
        engineLocation: string;
        preloadEngine?: boolean;
        preloadBlurryRecognition?: boolean;
    };
}
/**
 * Scandit SDK Service handling interaction with the Scandit SDK library, including configuration,
 * initialization and barcode picker creation
 */
export declare class ScanditSdkService {
    private readonly config;
    /**
     * The handler to call in case of an engine load error
     */
    private engineLoadErrorHandler;
    private configurationPromise;
    /**
     * Initialize the service and start loading the library based on the passed config options
     *
     * @param config Configuration options
     */
    constructor(config: ScanditSdkServiceConfig);
    /**
     * Create a new picker in a given HTML element
     *
     * See https://docs.scandit.com/stable/web/classes/barcodepicker.html#create
     *
     * @param element The HTML element that should contain the picker
     * @param params The parameters used for creating the picker
     * @returns A promise resolving to the created BarcodePicker
     */
    createPicker(element: HTMLElement, params?: any): Promise<BarcodePicker>;
    /**
     * Add a handler in the event of an error while loading the engine
     *
     * @param handler Function to handle an error while loading the engine
     */
    onEngineLoadError(handler: (error: Error) => any): void;
    /**
     * Configure the library and delegate error handling if needed.
     *
     * @param licenseKey The license key used for the library
     * @param options Configuration options
     * @param engineLocation The engine location
     * @param preloadEngine Whether to preload the external Scandit Engine library
     * @param preloadBlurryRecognition Whether to preload data needed for blurry recognition
     */
    private loadLibrary;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScanditSdkService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScanditSdkService>;
}
