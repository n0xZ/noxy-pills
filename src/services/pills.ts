import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { parse } from "valibot";
import { firestore } from "~/lib/firebase";

import { PillsOutput, pillSchema } from "~/utils/valibot";

export const getPillsByUserId = async (userId: string) => {
	try {
		const pillsQuery = query(
			collection(firestore, "pills"),
			where("userId", "==", userId),
		);
		const pillsCollection = await getDocs(pillsQuery);
		const pillsDocs = pillsCollection.docs;

		const pillsData = pillsDocs.map((doc) =>
			parse(pillSchema, { ...doc.data(), id: doc.id }),
		);
		return pillsData;
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
	}
};

export const createPill = async ({
	description,
	duration,
	frequency,
	name,
	userId,
}: PillsOutput) => {
	try {
		const pillColl = collection(firestore, "pills");
		const createPill = await addDoc(pillColl, {
			description,
			duration,
			frequency,
			name,
			userId,
			createdAt: new Date(),
		});
		return createPill;
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(e.message);
		}
	}
};

export const deletePill = async (id: string) => {
	const pillDoc = doc(firestore, "pills", id);
	const data = await deleteDoc(pillDoc);
	return data;
};
