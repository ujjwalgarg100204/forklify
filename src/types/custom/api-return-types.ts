interface Response {
	error: null | any;
	success: boolean;
}

export interface BookmarkResponse extends Response {
	bookmarked: boolean;
}

export interface DeleteResponse extends Response {
	deleted: number;
}
