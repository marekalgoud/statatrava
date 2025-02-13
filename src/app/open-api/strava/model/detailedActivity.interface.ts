/**
 * Strava API v3
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MetaAthlete } from './metaAthlete.interface';
import { SportType } from './sportType.interface';
import { PhotosSummary } from './photosSummary.interface';
import { DetailedSegmentEffort } from './detailedSegmentEffort.interface';
import { ActivityType } from './activityType.interface';
import { Lap } from './lap.interface';
import { PolylineMap } from './polylineMap.interface';
import { Split } from './split.interface';
import { SummaryGear } from './summaryGear.interface';


export interface DetailedActivity { 
    /**
     * The unique identifier of the activity
     */
    id?: number;
    /**
     * The identifier provided at upload time
     */
    external_id?: string;
    /**
     * The identifier of the upload that resulted in this activity
     */
    upload_id?: number;
    athlete?: MetaAthlete;
    /**
     * The name of the activity
     */
    name?: string;
    /**
     * The activity\'s distance, in meters
     */
    distance?: number;
    /**
     * The activity\'s moving time, in seconds
     */
    moving_time?: number;
    /**
     * The activity\'s elapsed time, in seconds
     */
    elapsed_time?: number;
    /**
     * The activity\'s total elevation gain.
     */
    total_elevation_gain?: number;
    /**
     * The activity\'s highest elevation, in meters
     */
    elev_high?: number;
    /**
     * The activity\'s lowest elevation, in meters
     */
    elev_low?: number;
    type?: ActivityType;
    sport_type?: SportType;
    /**
     * The time at which the activity was started.
     */
    start_date?: string;
    /**
     * The time at which the activity was started in the local timezone.
     */
    start_date_local?: string;
    /**
     * The timezone of the activity
     */
    timezone?: string;
    /**
     * A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers.
     */
    start_latlng?: number[];
    /**
     * A pair of latitude/longitude coordinates, represented as an array of 2 floating point numbers.
     */
    end_latlng?: number[];
    /**
     * The number of achievements gained during this activity
     */
    achievement_count?: number;
    /**
     * The number of kudos given for this activity
     */
    kudos_count?: number;
    /**
     * The number of comments for this activity
     */
    comment_count?: number;
    /**
     * The number of athletes for taking part in a group activity
     */
    athlete_count?: number;
    /**
     * The number of Instagram photos for this activity
     */
    photo_count?: number;
    /**
     * The number of Instagram and Strava photos for this activity
     */
    total_photo_count?: number;
    map?: PolylineMap;
    /**
     * Whether this activity was recorded on a training machine
     */
    trainer?: boolean;
    /**
     * Whether this activity is a commute
     */
    commute?: boolean;
    /**
     * Whether this activity was created manually
     */
    manual?: boolean;
    /**
     * Whether this activity is private
     */
    'private'?: boolean;
    /**
     * Whether this activity is flagged
     */
    flagged?: boolean;
    /**
     * The activity\'s workout type
     */
    workout_type?: number;
    /**
     * The unique identifier of the upload in string format
     */
    upload_id_str?: string;
    /**
     * The activity\'s average speed, in meters per second
     */
    average_speed?: number;
    /**
     * The activity\'s max speed, in meters per second
     */
    max_speed?: number;
    /**
     * Whether the logged-in athlete has kudoed this activity
     */
    has_kudoed?: boolean;
    /**
     * Whether the activity is muted
     */
    hide_from_home?: boolean;
    /**
     * The id of the gear for the activity
     */
    gear_id?: string;
    /**
     * The total work done in kilojoules during this activity. Rides only
     */
    kilojoules?: number;
    /**
     * Average power output in watts during this activity. Rides only
     */
    average_watts?: number;
    /**
     * Whether the watts are from a power meter, false if estimated
     */
    device_watts?: boolean;
    /**
     * Rides with power meter data only
     */
    max_watts?: number;
    /**
     * Similar to Normalized Power. Rides with power meter data only
     */
    weighted_average_watts?: number;
    /**
     * The description of the activity
     */
    description?: string;
    photos?: PhotosSummary;
    gear?: SummaryGear;
    /**
     * The number of kilocalories consumed during this activity
     */
    calories?: number;
    segment_efforts?: DetailedSegmentEffort[];
    /**
     * The name of the device used to record the activity
     */
    device_name?: string;
    /**
     * The token used to embed a Strava activity
     */
    embed_token?: string;
    /**
     * The splits of this activity in metric units (for runs)
     */
    splits_metric?: Split[];
    /**
     * The splits of this activity in imperial units (for runs)
     */
    splits_standard?: Split[];
    laps?: Lap[];
    best_efforts?: DetailedSegmentEffort[];
}
export namespace DetailedActivity {
}


