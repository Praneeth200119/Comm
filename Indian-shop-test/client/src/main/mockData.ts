export interface IValueLabel {
	value: string;
	label: string;
}

export const CORPORATE_AFFILIATION = "CorporateAffiliation";
export const DEMOGRAPHIC_DETAILS = "DemographicDetails";
export const SOCIAL_DETAILS = "SocialDetails";
export const HEALTH_AND_FITNESS_DETAILS = "HealthAndFitnessDetails";

export type RoleType = {
	value: string;
	label: string;
	allowedTypes: string[];
};
export const roleTypes: RoleType[] = [
	{
		value: DEMOGRAPHIC_DETAILS,
		label: "Demographic Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
	{
		value: SOCIAL_DETAILS,
		label: "Social Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
	{
		value: HEALTH_AND_FITNESS_DETAILS,
		label: "Health & fitness Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
];
export const roleTypeCA: RoleType[] = [
	{
		value: CORPORATE_AFFILIATION,
		label: "Corporate Affiliation",
		allowedTypes: ["athletic-coach"],
	},
	{
		value: DEMOGRAPHIC_DETAILS,
		label: "Demographic Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
	{
		value: SOCIAL_DETAILS,
		label: "Social Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
	{
		value: HEALTH_AND_FITNESS_DETAILS,
		label: "Health & fitness Profile",
		allowedTypes: ["athlete", "athletic-coach"],
	},
];

export const profileOptions: IValueLabel[] = [
	{
		label: "Athlete",
		value: "athlete",
	},
	{
		label: "Athletic Coach",
		value: "athletic-coach",
	},
];

export const genderOptions: IValueLabel[] = [
	{
		label: "Male",
		value: "Male",
	},
	{
		label: "Female",
		value: "Female",
	},
	{
		label: "Others",
		value: "Others",
	},
];

export const incomeRanges: IValueLabel[] = [
	{
		label: "Below $60K",
		value: "Below $60K",
	},
	{
		label: "$60K to $80K",
		value: "$60K to $80K",
	},
	{
		label: "$80K to $100K",
		value: "$80K to $100K",
	},
	{
		label: "$100K to $150K",
		value: "$100K to $150K",
	},
	{
		label: "$150K to $250K",
		value: "$150K to $250K",
	},
	{
		label: "$Above $250K",
		value: "$Above $250K",
	},
];

export const yesOrNoOptions: IValueLabel[] = [
	{
		label: "Yes",
		value: "Yes",
	},
	{
		label: "No",
		value: "No",
	},
];

export const educationLevels: IValueLabel[] = [
	{
		label: "No formal education",
		value: "No formal education",
	},
	{
		label: "Primary education",
		value: "Primary education",
	},
	{
		label: "Secondary education or high school",
		value: "Secondary education or high school",
	},
	{
		label: "GED",
		value: "GED",
	},
	{
		label: "Vocational qualification",
		value: "Vocational qualification",
	},
	{
		label: "Bachelor's degree",
		value: "Bachelor's degree",
	},
	{
		label: "Master's degree",
		value: "Master's degree",
	},
	{
		label: "Doctorate or higher",
		value: "Doctorate or higher",
	},
];

export const heightOptions: IValueLabel[] = [
	{
		label: "4 ft",
		value: "4 ft",
	},
	{
		label: "4.1 ft",
		value: "4.1 ft",
	},
	{
		label: "4.2 ft",
		value: "4.2 ft",
	},
	{
		label: "4.3 ft",
		value: "4.3 ft",
	},
	{
		label: "4.4 ft",
		value: "4.4 ft",
	},
	{
		label: "4.5 ft",
		value: "4.5 ft",
	},
	{
		label: "4.6 ft",
		value: "4.6 ft",
	},
	{
		label: "4.7 ft",
		value: "4.7 ft",
	},
	{
		label: "4.8 ft",
		value: "4.8 ft",
	},
	{
		label: "4.9 ft",
		value: "4.9 ft",
	},
	{
		label: "4.10 ft",
		value: "4.10 ft",
	},
	{
		label: "4.11 ft",
		value: "4.11 ft",
	},
	{
		label: "5 ft",
		value: "5 ft",
	},
	{
		label: "5.1 ft",
		value: "5.1 ft",
	},
	{
		label: "5.2 ft",
		value: "5.2 ft",
	},
	{
		label: "5.3 ft",
		value: "5.3 ft",
	},
	{
		label: "5.4 ft",
		value: "5.4 ft",
	},
	{
		label: "5.5 ft",
		value: "5.5 ft",
	},
	{
		label: "5.6 ft",
		value: "5.6 ft",
	},
	{
		label: "5.7 ft",
		value: "5.7 ft",
	},
	{
		label: "5.8 ft",
		value: "5.8 ft",
	},
	{
		label: "5.9 ft",
		value: "5.9 ft",
	},
	{
		label: "5.10 ft",
		value: "5.10 ft",
	},
	{
		label: "5.11 ft",
		value: "5.11 ft",
	},
	{
		label: "6 ft",
		value: "6 ft",
	},
	{
		label: "6.1 ft",
		value: "6.1 ft",
	},
	{
		label: "6.2 ft",
		value: "6.2 ft",
	},
	{
		label: "6.3 ft",
		value: "6.3 ft",
	},
	{
		label: "6.4 ft",
		value: "6.4 ft",
	},
	{
		label: "6.5 ft",
		value: "6.5 ft",
	},
	{
		label: "6.6 ft",
		value: "6.6 ft",
	},
	{
		label: "6.7 ft",
		value: "6.7 ft",
	},
	{
		label: "6.8 ft",
		value: "6.8 ft",
	},
	{
		label: "6.9 ft",
		value: "6.9 ft",
	},
	{
		label: "6.10 ft",
		value: "6.10 ft",
	},
	{
		label: "6.11 ft",
		value: "6.11 ft",
	},
	{
		label: "7 ft",
		value: "7 ft",
	},
	{
		label: "7.1 ft",
		value: "7.1 ft",
	},
	{
		label: "7.2 ft",
		value: "7.2 ft",
	},
	{
		label: "7.3 ft",
		value: "7.3 ft",
	},
	{
		label: "7.4 ft",
		value: "7.4 ft",
	},
	{
		label: "7.5 ft",
		value: "7.5 ft",
	},
];

export const chronicConditions: IValueLabel[] = [
	{
		label: "Heart diseases and stroke",
		value: "Heart diseases and stroke",
	},
	{
		label: "Diabetes",
		value: "Diabetes",
	},
	{
		label: "Arthritis",
		value: "Arthritis",
	},
	{
		label: "Alcohol-related health issues",
		value: "Alcohol-related health issues",
	},
	{
		label: "Cancer",
		value: "Cancer",
	},
	{
		label: "Obesity",
		value: "Obesity",
	},
	{
		label: "Alzheimer's disease",
		value: "Alzheimer's disease",
	},
	{
		label: "Smoking-related health issues",
		value: "Smoking-related health issues",
	},
	{
		label: "No diagnosed chronic condition",
		value: "No diagnosed chronic condition",
	},
];
