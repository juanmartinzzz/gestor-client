import app from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./config";

const getDocWithId = queryDocumentSnapshot => {
  if (!queryDocumentSnapshot.exists) {
    return;
  }

  return {
    id: queryDocumentSnapshot.id,
    ...queryDocumentSnapshot.data(),
  };
};

const getDocsWithId = collection => {
  return collection.docs.map(doc => getDocWithId(doc));
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.db = app.firestore();
  }

  // Listen for changes on a whole collection
  onCollection = (path, { orderBy, limit, onSnapshot, onError, onCompletion }) => {
    return this.prepareQuery(path, {orderBy, limit}).onSnapshot(collection => onSnapshot(getDocsWithId(collection)), this.logError, onCompletion);
  };

  // Listen for changes on a particular document
  onDocument = (path, document, { onSnapshot, onError, onCompletion }) => {
    return this.db
      .collection(path)
      .doc(document)
      .onSnapshot(
        doc => onSnapshot(getDocWithId(doc)),
        this.logError,
        onCompletion,
      );
  };

  prepareQuery = (path, {orderBy, limit}) => {
    let reference = this.db.collection(path).limit(limit || 10);

    if(orderBy) {
      // TODO order by several properties
      const [property, direction] = orderBy[0].split("-");
      reference = reference.orderBy(property, direction);
    }

    return reference;
  }

  set = async ({ path, doc, data, replace }) =>
    this.db
      .collection(path)
      .doc(doc)
      .set(this.getDataWithDefaultFields(data), { merge: !replace });

  get = async (path, { include, orderBy, limit }) => {
    const reference = this.prepareQuery(path, {orderBy, limit});
    const querySnapshot = await reference.get();

    const entities = await Promise.all(
      querySnapshot.docs.map(async doc => ({
        ...getDocWithId(doc),
        ...(await this.getSubcollections(doc, include || [])),
      })),
    );

    return entities;
  };

  getSubcollections = async (queryDocumentSnapshot, include) => {
    const subcollections = {};

    if (include) {
      await Promise.all(
        include.map(async detailLevelEntityPair => {
          // TODO take detailLevel into account
          const [detailLevel, entity] = detailLevelEntityPair.split("-");
          const entities = await this.get(
            `${queryDocumentSnapshot.ref.path}/${entity}`,
            include,
          );

          subcollections[entity] = entities;
        }),
      );
    }

    return subcollections;
  };

  getDataWithDefaultFields = data => ({
    ...data,
    created: data.created ? data.created : app.firestore.Timestamp.now(),
    modified: app.firestore.Timestamp.now(),
  });

  logError = (response, body) => {
    console.log("--There was an Error on Firebase");
    console.log("--response", response);
    console.log("--body", body);
  };
}

export default Firebase;
