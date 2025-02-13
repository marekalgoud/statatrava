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
import { ActivityType } from './activityType.interface';


export interface ClubActivity { 
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
    type?: ActivityType;
    sport_type?: SportType;
    /**
     * The activity\'s workout type
     */
    workout_type?: number;
}
export namespace ClubActivity {
}


