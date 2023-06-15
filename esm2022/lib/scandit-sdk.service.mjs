import { Injectable } from "@angular/core";
import { BarcodePicker, configure } from "scandit-sdk";
import * as i0 from "@angular/core";
/**
 * Configuration object for library setup
 */
export class ScanditSdkServiceConfig {
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
export class ScanditSdkService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbmRpdC1zZGsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvc2NhbmRpdC1zZGsuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFXLE1BQU0sYUFBYSxDQUFDOztBQUVoRTs7R0FFRztBQUNILE1BQU0sT0FBTyx1QkFBdUI7SUFDbEM7Ozs7T0FJRztJQUNILFVBQVUsQ0FBUztJQUVuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsT0FBTyxDQUlMO0NBQ0g7QUFFRDs7O0dBR0c7QUFJSCxNQUFNLE9BQU8saUJBQWlCO0lBYUM7SUFaN0I7O09BRUc7SUFDSyxzQkFBc0IsQ0FBd0I7SUFFOUMsb0JBQW9CLEdBQTRCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUUxRTs7OztPQUlHO0lBQ0gsWUFBNkIsTUFBK0I7UUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFDMUQsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0ksWUFBWSxDQUFDLE9BQW9CLEVBQUUsTUFBWTtRQUNwRCxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDbEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN6QyxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQkFBaUIsQ0FBQyxPQUE4QjtRQUNyRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsT0FBTyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNLLFdBQVcsQ0FDakIsVUFBa0IsRUFDbEIsT0FBZ0c7UUFFaEcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZFLElBQUksSUFBSSxDQUFDLHNCQUFzQixJQUFJLElBQUksRUFBRTtnQkFDdkMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNkO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7dUdBbkVVLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJhcmNvZGVQaWNrZXIsIGNvbmZpZ3VyZSwgU2Nhbm5lciB9IGZyb20gXCJzY2FuZGl0LXNka1wiO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBsaWJyYXJ5IHNldHVwXG4gKi9cbmV4cG9ydCBjbGFzcyBTY2FuZGl0U2RrU2VydmljZUNvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgbGljZW5zZSBrZXkgdG8gYmUgdXNlZCBmb3IgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogQHNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9pbmRleC5odG1sI2NvbmZpZ3VyYXRpb25cbiAgICovXG4gIGxpY2Vuc2VLZXk6IHN0cmluZztcblxuICAvKipcbiAgICogQ29uZmlndXJhdGlvbiBvcHRpb25zIHdpdGggdGhlIGZvbGxvd2luZyBzaWduYXR1cmU6XG4gICAqIHtcbiAgICogICAgZW5naW5lTG9jYXRpb246IHN0cmluZyA9IFwiL1wiLFxuICAgKiAgICBwcmVsb2FkRW5naW5lPzogYm9vbGVhbiA9IHRydWUsXG4gICAqICAgIHByZWxvYWRCbHVycnlSZWNvZ25pdGlvbj86IGJvb2xlYW4gPSB0cnVlXG4gICAqIH1cbiAgICpcbiAgICogYG9wdGlvbnMuZW5naW5lTG9jYXRpb25gOiBUaGUgbG9jYXRpb24gb2YgdGhlIFNjYW5kaXQgRW5naW5lIGBzY2FuZGl0LWVuZ2luZS1zZGsubWluLmpzYCBhbmRcbiAgICogYHNjYW5kaXQtZW5naW5lLXNkay53YXNtYCAoZXh0ZXJuYWwgV2ViQXNzZW1ibHkgZmlsZXMpLiBZb3UgbXVzdCBjb3B5IHRoZSByZWxldmFudCBmaWxlc1xuICAgKiB0byBhIHBsYWNlIHdoZXJlIHRoZXkgY2FuIGJlIHNlcnZlZCBmcm9tLCBlLmcuIGBhc3NldHNgLlxuICAgKlxuICAgKiBgb3B0aW9ucy5wcmVsb2FkRW5naW5lYDogX29wdGlvbmFsXy4gV2hldGhlciB0byBwcmVsb2FkIChkb3dubG9hZCBpZiBuZWVkZWQsIGNvbXBpbGUvaW5zdGFudGlhdGVcbiAgICogV2ViQXNzZW1ibHkgY29kZSBhbmQgaW5pdGlhbGl6ZSkgdGhlIGV4dGVybmFsIFNjYW5kaXQgRW5naW5lIGxpYnJhcnksIHVzZWQgYnkgQmFyY29kZVBpY2tlciBhbmQgU2Nhbm5lclxuICAgKiBvYmplY3RzIHRvIHBlcmZvcm0gc2NhbiBvcGVyYXRpb25zLlxuICAgKlxuICAgKiBgb3B0aW9ucy5wcmVsb2FkQmx1cnJ5UmVjb2duaXRpb25gOiBfb3B0aW9uYWxfLiBXaGV0aGVyIHRvIHByZWxvYWQgKGxvYWQgb3IgZ2VuZXJhdGUgaWYgbmVlZGVkKSBkYXRhIG5lZWRlZCBmb3JcbiAgICogYmx1cnJ5IHJlY29nbml0aW9uIGFzIHNvb24gYXMgcG9zc2libGUgdmlhIGEgc2VwYXJhdGUgYXN5bmNocm9ub3VzIFdlYldvcmtlciB0aHJlYWQgcnVubmluZyB0aGUgU2NhbmRpdCBFbmdpbmVcbiAgICogbGlicmFyeS4gRGF0YSBmb3IgYWxsIHN5bWJvbG9naWVzIGlzIGdlbmVyYXRlZCBvdmVyIHRpbWUuXG4gICAqXG4gICAqIEBzZWUgaHR0cHM6Ly9kb2NzLnNjYW5kaXQuY29tL3N0YWJsZS93ZWIvaW5kZXguaHRtbCNjb25maWd1cmF0aW9uXG4gICAqL1xuICBvcHRpb25zOiB7XG4gICAgZW5naW5lTG9jYXRpb246IHN0cmluZztcbiAgICBwcmVsb2FkRW5naW5lPzogYm9vbGVhbjtcbiAgICBwcmVsb2FkQmx1cnJ5UmVjb2duaXRpb24/OiBib29sZWFuO1xuICB9O1xufVxuXG4vKipcbiAqIFNjYW5kaXQgU0RLIFNlcnZpY2UgaGFuZGxpbmcgaW50ZXJhY3Rpb24gd2l0aCB0aGUgU2NhbmRpdCBTREsgbGlicmFyeSwgaW5jbHVkaW5nIGNvbmZpZ3VyYXRpb24sXG4gKiBpbml0aWFsaXphdGlvbiBhbmQgYmFyY29kZSBwaWNrZXIgY3JlYXRpb25cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiBcInJvb3RcIlxufSlcbmV4cG9ydCBjbGFzcyBTY2FuZGl0U2RrU2VydmljZSB7XG4gIC8qKlxuICAgKiBUaGUgaGFuZGxlciB0byBjYWxsIGluIGNhc2Ugb2YgYW4gZW5naW5lIGxvYWQgZXJyb3JcbiAgICovXG4gIHByaXZhdGUgZW5naW5lTG9hZEVycm9ySGFuZGxlcjogKGVycm9yOiBFcnJvcikgPT4gYW55O1xuXG4gIHByaXZhdGUgY29uZmlndXJhdGlvblByb21pc2U6IFByb21pc2U8dm9pZCB8IFNjYW5uZXI+ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgdGhlIHNlcnZpY2UgYW5kIHN0YXJ0IGxvYWRpbmcgdGhlIGxpYnJhcnkgYmFzZWQgb24gdGhlIHBhc3NlZCBjb25maWcgb3B0aW9uc1xuICAgKlxuICAgKiBAcGFyYW0gY29uZmlnIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBjb25maWc6IFNjYW5kaXRTZGtTZXJ2aWNlQ29uZmlnKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRpbmcgU2NhbmRpdCBsaWJyYXJ5Li4uXCIpO1xuICAgIHRoaXMubG9hZExpYnJhcnkoY29uZmlnLmxpY2Vuc2VLZXksIGNvbmZpZy5vcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgcGlja2VyIGluIGEgZ2l2ZW4gSFRNTCBlbGVtZW50XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RvY3Muc2NhbmRpdC5jb20vc3RhYmxlL3dlYi9jbGFzc2VzL2JhcmNvZGVwaWNrZXIuaHRtbCNjcmVhdGVcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIEhUTUwgZWxlbWVudCB0aGF0IHNob3VsZCBjb250YWluIHRoZSBwaWNrZXJcbiAgICogQHBhcmFtIHBhcmFtcyBUaGUgcGFyYW1ldGVycyB1c2VkIGZvciBjcmVhdGluZyB0aGUgcGlja2VyXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSByZXNvbHZpbmcgdG8gdGhlIGNyZWF0ZWQgQmFyY29kZVBpY2tlclxuICAgKi9cbiAgcHVibGljIGNyZWF0ZVBpY2tlcihlbGVtZW50OiBIVE1MRWxlbWVudCwgcGFyYW1zPzogYW55KTogUHJvbWlzZTxCYXJjb2RlUGlja2VyPiB7XG4gICAgaWYgKHBhcmFtcyA9PSBudWxsKSB7XG4gICAgICBwYXJhbXMgPSB7fTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb25maWd1cmF0aW9uUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBCYXJjb2RlUGlja2VyLmNyZWF0ZShlbGVtZW50LCBwYXJhbXMpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGhhbmRsZXIgaW4gdGhlIGV2ZW50IG9mIGFuIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIGVuZ2luZVxuICAgKlxuICAgKiBAcGFyYW0gaGFuZGxlciBGdW5jdGlvbiB0byBoYW5kbGUgYW4gZXJyb3Igd2hpbGUgbG9hZGluZyB0aGUgZW5naW5lXG4gICAqL1xuICBwdWJsaWMgb25FbmdpbmVMb2FkRXJyb3IoaGFuZGxlcjogKGVycm9yOiBFcnJvcikgPT4gYW55KTogdm9pZCB7XG4gICAgdGhpcy5lbmdpbmVMb2FkRXJyb3JIYW5kbGVyID0gaGFuZGxlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmUgdGhlIGxpYnJhcnkgYW5kIGRlbGVnYXRlIGVycm9yIGhhbmRsaW5nIGlmIG5lZWRlZC5cbiAgICpcbiAgICogQHBhcmFtIGxpY2Vuc2VLZXkgVGhlIGxpY2Vuc2Uga2V5IHVzZWQgZm9yIHRoZSBsaWJyYXJ5XG4gICAqIEBwYXJhbSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0gZW5naW5lTG9jYXRpb24gVGhlIGVuZ2luZSBsb2NhdGlvblxuICAgKiBAcGFyYW0gcHJlbG9hZEVuZ2luZSBXaGV0aGVyIHRvIHByZWxvYWQgdGhlIGV4dGVybmFsIFNjYW5kaXQgRW5naW5lIGxpYnJhcnlcbiAgICogQHBhcmFtIHByZWxvYWRCbHVycnlSZWNvZ25pdGlvbiBXaGV0aGVyIHRvIHByZWxvYWQgZGF0YSBuZWVkZWQgZm9yIGJsdXJyeSByZWNvZ25pdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkTGlicmFyeShcbiAgICBsaWNlbnNlS2V5OiBzdHJpbmcsXG4gICAgb3B0aW9uczogeyBlbmdpbmVMb2NhdGlvbjogc3RyaW5nLCBwcmVsb2FkRW5naW5lPzogYm9vbGVhbiwgcHJlbG9hZEJsdXJyeVJlY29nbml0aW9uPzogYm9vbGVhbiB9XG4gICk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlndXJhdGlvblByb21pc2UgPSBjb25maWd1cmUobGljZW5zZUtleSwgb3B0aW9ucykuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgaWYgKHRoaXMuZW5naW5lTG9hZEVycm9ySGFuZGxlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZW5naW5lTG9hZEVycm9ySGFuZGxlcihlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChlcnJvcik7XG4gICAgICB9XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9KTtcbiAgfVxufVxuIl19