/**
 * Strava API v3
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface ClubAthlete { 
    /**
     * Resource state, indicates level of detail. Possible values: 1 -> \"meta\", 2 -> \"summary\", 3 -> \"detail\"
     */
    resource_state?: number;
    /**
     * The athlete\'s first name.
     */
    firstname?: string;
    /**
     * The athlete\'s last initial.
     */
    lastname?: string;
    /**
     * The athlete\'s member status.
     */
    member?: string;
    /**
     * Whether the athlete is a club admin.
     */
    admin?: boolean;
    /**
     * Whether the athlete is club owner.
     */
    owner?: boolean;
}

