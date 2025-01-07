/**
 * Strava API v3
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SmoothGradeStream { 
    /**
     * The number of data points in this stream
     */
    original_size?: number;
    /**
     * The level of detail (sampling) in which this stream was returned
     */
    resolution?: SmoothGradeStream.ResolutionEnum;
    /**
     * The base series used in the case the stream was downsampled
     */
    series_type?: SmoothGradeStream.SeriesTypeEnum;
    /**
     * The sequence of grade values for this stream, as percents of a grade
     */
    data?: number[];
}
export namespace SmoothGradeStream {
    export type ResolutionEnum = 'low' | 'medium' | 'high';
    export const ResolutionEnum = {
        low: 'low' as ResolutionEnum,
        medium: 'medium' as ResolutionEnum,
        high: 'high' as ResolutionEnum
    };
    export type SeriesTypeEnum = 'distance' | 'time';
    export const SeriesTypeEnum = {
        distance: 'distance' as SeriesTypeEnum,
        time: 'time' as SeriesTypeEnum
    };
}


