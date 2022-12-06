import { NextFunction, Request, Response } from 'express';
import { logger } from '../config/logger';
import { EstablishConnection, Query } from '../config/mysql';

const namespace = 'STUDENTS';

const createStudent = async (request: Request, response: Response, next: NextFunction) => {
    logger.info(namespace, '\nCreating new student');
    const { firstName, lastName, dateOfBirth } = request.body;
    const query = `INSERT INTO students(firstName, lastName, dateOfBirth) VALUES ("${firstName}", "${lastName}", "${dateOfBirth}")`;
    EstablishConnection().then((connection) => {
        Query(connection, query)
            .then((result) => {
                logger.info(namespace, 'Student created', result);

                return response.status(200).json({
                    result
                });
            })
            .catch((error) => {
                logger.error(namespace, error.message, error);

                const code = !firstName || !lastName || !dateOfBirth ? 400 : 500;
                return response.status(code).json({
                    message: error.message,
                    error
                });
            })
            .finally(() => {
                logger.info(namespace, 'Closing connection');
                connection.end();
            });
    });
};

const getAllStudents = async (request: Request, response: Response, next: NextFunction) => {
    logger.info(namespace, 'Getting all student entries');
    const query = 'SELECT * FROM students';

    EstablishConnection()
        .then((connection) => {
            Query(connection, query)
                .then((entries) => {
                    logger.info(namespace, 'Retrieving all students', entries);

                    return response.status(200).json({
                        results: entries
                    });
                })
                .catch((error) => {
                    logger.error(namespace, error.message, error);
                    return response.status(500).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logger.error(namespace, error.message, error);

            return response.status(500).json({
                message: error.message,
                error
            });
        });
};

const getStudentByID = async (request: Request, response: Response, next: NextFunction) => {
    logger.info(namespace, 'Getting student entry');
    const query = `SELECT * FROM students WHERE id = ${request.params.id}`;

    EstablishConnection()
        .then((connection) => {
            Query(connection, query)
                .then((entry) => {
                    logger.info(namespace, 'Retrieving all students', entry);

                    return response.status(200).json({
                        results: entry
                    });
                })
                .catch((error) => {
                    logger.error(namespace, error.message, error);
                    return response.status(404).json({
                        message: error.message,
                        error
                    });
                });
        })
        .catch((error) => {
            logger.error(namespace, error.message, error);

            return response.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createStudent, getAllStudents, getStudentByID };
