import { gql } from "graphql-tag";

/**
 * The user profile fragment
 */
export const profileFragment = gql`
	fragment AllProfileFields on Profile {
		id
		email
		username
		fullName
		firstName
	}
`;