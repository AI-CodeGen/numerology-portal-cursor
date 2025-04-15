import { Request, Response } from 'express';
import { NumerologyService } from '../services/numerologyService';

const numerologyService = new NumerologyService();

export const getMobileNumerology = async (req: Request, res: Response) => {
  try {
    const { mobileNumber } = req.body;
    const result = await numerologyService.calculateMobileNumerology(mobileNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating mobile numerology' });
  }
};

export const getNameNumerology = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await numerologyService.calculateNameNumerology(name);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating name numerology' });
  }
};

export const getVehicleNumerology = async (req: Request, res: Response) => {
  try {
    const { vehicleNumber } = req.body;
    const result = await numerologyService.calculateVehicleNumerology(vehicleNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating vehicle numerology' });
  }
}; 