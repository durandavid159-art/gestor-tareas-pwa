import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { uploadFileToCloudinary} from '../services/cloudinaryConfig';
import { useAuth } from '../context/AuthContext';
import {v4 as uuidv4} from "uuid";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) return;

        const tasksRef = collection(db, `users/${currentUser.uid}/tasks`);
        const q = query(tasksRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, [currentUser]);

    const addTask = async (task) => {

        const tasksRef = collection(db,`users/${currentUser.uid}/tasks`);

        await addDoc(tasksRef, {

            uuid: uuidv4(),

            title: task.title,

            description: task.description || "", 
            estimatedTime: task.estimatedTime || 0,

            timeSpent: 0,
            timerRunning: false,
            startedAt: null,

            comments: [],

            status: "pending",

            archived: false,

            createdAt: new Date(),

            updatedAt: new Date()
        });
    };

    const updateTask = async (taskId, updatedData) => {
        const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
        await updateDoc(taskRef, updatedData);
    };

    const deleteTask = async (taskId) => {
        const taskRef = doc(db, `users/${currentUser.uid}/tasks`, taskId);
        await deleteDoc(taskRef);
    };

    const archiveTask = async (
    taskId
) => {

    const taskRef = doc(
        db,
        `users/${currentUser.uid}/tasks`,
        taskId
    );

    await updateDoc(taskRef, {
        archived: true,
        updatedAt: new Date()
    });
    };

    const addComment = async (taskId, commentText) => {

        const task =
            tasks.find(
                task =>
                    task.id === taskId
            );

        if (!task) return;

        const taskRef = doc(
            db,
            `users/${currentUser.uid}/tasks`,
            taskId
        );

        const newComment = {

            id: crypto.randomUUID(),

            text: commentText,

            createdAt:
                new Date().toISOString()
        };

        await updateDoc(taskRef, {

            comments: [
                ...(task.comments || []),
                newComment
            ]
        });
    };

    const startTimer = async (taskId) => {

    const taskRef = doc(
        db,
        `users/${currentUser.uid}/tasks`,
        taskId
    );

    await updateDoc(taskRef, {

        timerRunning: true,

        startedAt:
            new Date().toISOString()
    });
    };

    const pauseTimer = async (taskId) => {

        const task =
            tasks.find(
                task =>
                    task.id === taskId
            );

        if (!task) return;

        const now = new Date();

        const started =
            new Date(task.startedAt);

        const elapsedSeconds =
            Math.floor(
                (now - started) / 1000
            );

        const taskRef = doc(
            db,
            `users/${currentUser.uid}/tasks`,
            taskId
        );

        await updateDoc(taskRef, {

            timerRunning: false,

            startedAt: null,

            timeSpent:
                (task.timeSpent || 0)
                + elapsedSeconds
        });
    };

    const addAttachment = async (taskId, file) => {

        const uploaded = await uploadFileToCloudinary(file);

        const task = tasks.find(t => t.id === taskId);

        if (!task) return;

        const taskRef =
            doc(
                db,
                `users/${currentUser.uid}/tasks`,
                taskId
            );

        await updateDoc(taskRef, {

            attachments: [
                ...(task.attachments || []),
                uploaded
            ],

            updatedAt: new Date()
        });
    };

    return { tasks, addTask, updateTask, deleteTask, archiveTask, addComment, startTimer, pauseTimer, addAttachment};
};