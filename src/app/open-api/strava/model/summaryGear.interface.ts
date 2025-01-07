/**
 * Strava API v3
 *
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface SummaryGear { 
    /**
     * The gear\'s unique identifier.
     */
    id?: string;
    /**
     * Resource state, indicates level of detail. Possible values: 2 -> \"summary\", 3 -> \"detail\"
     */
    resource_state?: number;
    /**
     * Whether this gear\'s is the owner\'s default one.
     */
    primary?: boolean;
    /**
     * The gear\'s name.
     */
    name?: string;
    /**
     * The distance logged with this gear.
     */
    distance?: number;
}

