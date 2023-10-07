import { Profile } from "passport-github2";

export default interface GitHubProfile extends Profile {
	id: string;
	username: string;
	provider: string;
	_json: {
		login: string;
		id: number;
		avatar_url: string;
		url: string;
		name?: string;
		company?: string;
		blog?: string;
		location?: string;
		email?: string;
		bio?: string;
	};
}
