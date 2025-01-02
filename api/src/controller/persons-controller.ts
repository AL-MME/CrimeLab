import { Request, Response } from 'express';
import { PersonsService } from '../service/persons-service';
import { IPerson, Person } from '../models/Person';

export class PersonsController {
    static async createPerson(req: Request, res: Response): Promise<void> {
        try {
            const personData: Partial<IPerson> = req.body;
            const newPerson = await PersonsService.createPerson(personData);
            res.status(201).json(newPerson);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPersonById(req: Request, res: Response): Promise<void> {
        try {
            const personId = req.params.id;
            const personData = await PersonsService.getPersonById(personId);
            if (personData) {
                res.status(200).json(personData);
            } else {
                res.status(404).json({ message: 'Person not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllPersons(req: Request, res: Response): Promise<void> {
        try {
            const persons = await PersonsService.getAllPersons();
            res.status(200).json(persons);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePerson(req: Request, res: Response): Promise<void> {
        try {
            const personId = req.params.id;
            const personData: Partial<IPerson> = req.body;
            const updatedPerson = await PersonsService.updatePerson(personId, personData);
            if (updatedPerson) {
                res.status(200).json({
                    message: 'Person updated successfully',
                    updatedPerson,
                });
            } else {
                res.status(404).json({ message: 'Person not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletePerson(req: Request, res: Response): Promise<void> {
        try {
            const personId = req.params.id;
            const deletedPerson = await PersonsService.deletePerson(personId);
            if (deletedPerson) {
                res.status(200).json({
                    message: `Person ${deletedPerson._id} deleted successfully`
                });
            } else {
                res.status(404).json({ message: 'Person not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}