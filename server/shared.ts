import { Request } from 'express';

export function getServiceUrl(request: Request) {
    return request.protocol + '://' + request.get('host');
}

export interface FitbitResponse {
    access_token: String;
    user: FitbitProfile;
}

export interface FitbitProfile {
    encodedId: String;
}

export interface FitbitFat {
    date: String;
    fat: Number;
    logId: Number;
    source: String;
    time: String;
}

export interface FitbitGoals {
    activeMinutes: Number;
    caloriesOut: Number;
    distance: Number;
    floors: Number;
    steps: Number;
}

export interface FitbitDistance {
    activity: String;
    distance: Number;
}

export interface FitbitHeartRateZone {
    caloriesOut: Number;
    max: Number;
    min: Number;
    minutes: Number;
    name: String;
}

export interface FitbitSummary {
    activeScore: Number;
    activityCalories: Number;
    caloriesBMR: Number;
    caloriesOut: Number;
    distances: FitbitDistance[];
    elevation: Number;
    fairlyActiveMinutes: Number;
    floors: Number;
    heartRateZones: FitbitHeartRateZone[];
    lightlyActiveMinutes: Number;
    marginalCalories: Number;
    restingHeartRate: Number;
    sedentaryMinutes: Number;
    steps: Number;
    veryActiveMinutes: Number;
}

export interface FitbitStats {
    goals: FitbitGoals;
    summary: FitbitSummary;
}

export interface FitbitActivitiesCalories {
    dateTime: String;
    value: String;
}

export interface FitbitFoodSummary {
    calories: Number;
    carbs: Number;
    fat: Number;
    fiber: Number;
    protein: Number;
    sodium: Number;
    water: Number;
}
