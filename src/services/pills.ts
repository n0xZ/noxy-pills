import { collection, getDocs, query, where } from "firebase/firestore";
import { parse } from "valibot";
import { firestore } from "~/lib/firebase";

import { pillSchema } from "~/utils/valibot";

export const getPillsByUserId = async (userId: string) => {
	try {
		const pillsQuery = query(
			collection(firestore, "pills"),
			where("userId", "==", userId),
		);
		const pillsCollection = await getDocs(pillsQuery);
		const pillsDocs = pillsCollection.docs;
		const pillsData = pillsDocs.map((doc) => parse(pillSchema, doc.data()));
		return pillsData;
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
	}
};
