import { Inject, NgModule } from "@angular/core";
import { ScanditSdkBarcodePickerComponent } from "./scandit-sdk-barcode-picker.component";
import { ScanditSdkServiceConfig } from "./scandit-sdk.service";
import * as i0 from "@angular/core";
/**
 * Scandit Web SDK Module
 */
export class ScanditSdkModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NhbmRpdC1zZGsubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zY2FuZGl0LXNkay5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBdUMsUUFBUSxFQUFZLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzFGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQUVoRTs7R0FFRztBQUtILE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0IsTUFBTSxDQUFDLE1BQU0sR0FBWSxLQUFLLENBQUM7SUFFL0IsWUFBZ0QsUUFBMEIsSUFBSSxDQUFDO0lBRS9FLE1BQU0sQ0FBQyxPQUFPO1FBQ1osSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7WUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxxRUFBcUUsQ0FBQyxDQUFDO1NBQ3hGO1FBQ0QsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FDWixVQUFrQixFQUNsQixPQUFnRztRQUVoRyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLDBCQUEwQjtvQkFDbkMsVUFBVSxFQUFFLGdCQUFnQixDQUFDLE9BQU87aUJBQ3JDO2dCQUNEO29CQUNFLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLFFBQVEsRUFBRTt3QkFDUixVQUFVO3dCQUNWLE9BQU87cUJBQ1I7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDYixPQUFPO1lBQ0wsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixTQUFTLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFDSixDQUFDO3VHQXZDVSxnQkFBZ0Isa0JBR1AsMEJBQTBCO3dHQUhuQyxnQkFBZ0IsaUJBSFosZ0NBQWdDLGFBQ3JDLGdDQUFnQzt3R0FFL0IsZ0JBQWdCOzsyRkFBaEIsZ0JBQWdCO2tCQUo1QixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGdDQUFnQyxDQUFDO29CQUNoRCxPQUFPLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztpQkFDNUM7OzBCQUljLE1BQU07MkJBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFNjYW5kaXRTZGtCYXJjb2RlUGlja2VyQ29tcG9uZW50IH0gZnJvbSBcIi4vc2NhbmRpdC1zZGstYmFyY29kZS1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTY2FuZGl0U2RrU2VydmljZUNvbmZpZyB9IGZyb20gXCIuL3NjYW5kaXQtc2RrLnNlcnZpY2VcIjtcblxuLyoqXG4gKiBTY2FuZGl0IFdlYiBTREsgTW9kdWxlXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1NjYW5kaXRTZGtCYXJjb2RlUGlja2VyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1NjYW5kaXRTZGtCYXJjb2RlUGlja2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBTY2FuZGl0U2RrTW9kdWxlIHtcbiAgc3RhdGljIGxvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoXCJTY2FuZGl0U2RrTW9kdWxlSW5zdGFuY2VcIikgaW5zdGFuY2U6IFNjYW5kaXRTZGtNb2R1bGUpIHsgfVxuXG4gIHN0YXRpYyBmYWN0b3J5KCk6IHZvaWQge1xuICAgIGlmIChTY2FuZGl0U2RrTW9kdWxlLmxvYWRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2NhbmRpdFNka01vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGl0IGluIHRoZSBBcHBNb2R1bGUgb25seVwiKTtcbiAgICB9XG4gICAgU2NhbmRpdFNka01vZHVsZS5sb2FkZWQgPSB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoXG4gICAgbGljZW5zZUtleTogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgZW5naW5lTG9jYXRpb246IHN0cmluZzsgcHJlbG9hZEVuZ2luZT86IGJvb2xlYW47IHByZWxvYWRCbHVycnlSZWNvZ25pdGlvbj86IGJvb2xlYW4gfVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFNjYW5kaXRTZGtNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFNjYW5kaXRTZGtNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFwiU2NhbmRpdFNka01vZHVsZUluc3RhbmNlXCIsXG4gICAgICAgICAgdXNlRmFjdG9yeTogU2NhbmRpdFNka01vZHVsZS5mYWN0b3J5XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBTY2FuZGl0U2RrU2VydmljZUNvbmZpZyxcbiAgICAgICAgICB1c2VWYWx1ZToge1xuICAgICAgICAgICAgbGljZW5zZUtleSxcbiAgICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8U2NhbmRpdFNka01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogU2NhbmRpdFNka01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW11cbiAgICB9O1xuICB9XG59XG4iXX0=