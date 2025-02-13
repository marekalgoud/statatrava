/**
 * Strava API v3
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SummaryPRSegmentEffort { 
    /**
     * The unique identifier of the activity related to the PR effort.
     */
    pr_activity_id?: number;
    /**
     * The elapsed time ot the PR effort.
     */
    pr_elapsed_time?: number;
    /**
     * The time at which the PR effort was started.
     */
    pr_date?: string;
    /**
     * Number of efforts by the authenticated athlete on this segment.
     */
    effort_count?: number;
}

