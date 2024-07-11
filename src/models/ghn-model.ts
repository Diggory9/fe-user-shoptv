export interface ProvinceModel {
    ProvinceID?: number,
    ProvinceName?: string,
    Code?: string
}
export interface WardModel {
    WardCode?: number
    DistrictID?: number,
    WardName?: string
}
export interface DistrictModel {
    DistrictID?: number,
    ProvinceID?: number,
    DistrictName?: string,
    Code?: string,
    Type?: number,
    SupportType?: number
}
