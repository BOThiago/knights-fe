import { defineStore } from 'pinia';
import axios from 'axios';

interface Knight {
    _id?: string;
    name: string;
    nickname: string;
    birthday: string;
    weapons: {
        name: string;
        mod: number;
        attr: string;
        equipped: boolean;
    }[];
    attributes: {
        strength: number;
        dexterity: number;
        constitution: number;
        intelligence: number;
        wisdom: number;
        charisma: number;
    };
    keyAttribute: string;
    age?: number;
    attack?: number;
    exp?: number;
}

export const useKnightsStore = defineStore('knights', {
    state: () => ({
        knights: [] as Knight[],
        heroes: [] as Knight[],
    }),
    actions: {
        async fetchKnights() {
            try {
                const { data } = await axios.get<Knight[]>('http://localhost:3000/knights');
                this.knights = data;
            } catch (error) {
                console.error('Error fetching knights:', error);
            }
        },
        async fetchHeroes() {
            try {
                const { data } = await axios.get<Knight[]>('http://localhost:3000/knights?filter=heroes');
                this.heroes = data;
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        },
        async getKnightById(id: string) {
            try {
                const { data } = await axios.get<Knight>(`http://localhost:3000/knights/${id}`);
                return data;
            } catch (error) {
                console.error('Error fetching knight:', error);
                throw error;
            }
        },
        async createKnight(knight: Knight) {
            try {
                const { data } = await axios.post<Knight>('http://localhost:3000/knights', knight);
                this.knights.push(data);
                return data;
            } catch (error) {
                console.error('Error creating knight:', error);
                throw error;
            }
        },
        async updateNickname(id: string, newNickname: string) {
            try {
                const { data } = await axios.patch<Knight>(
                    `http://localhost:3000/knights/${id}`,
                    { nickname: newNickname },
                );
                const idx = this.knights.findIndex((k) => k._id === id);
                if (idx >= 0) {
                    this.knights[idx].nickname = data.nickname;
                }
                return data;
            } catch (error) {
                console.error('Error updating nickname:', error);
                throw error;
            }
        },
        async removeKnight(id: string) {
            try {
                await axios.delete(`http://localhost:3000/knights/${id}`);
                this.knights = this.knights.filter((k) => k._id !== id);
            } catch (error) {
                console.error('Error removing knight:', error);
                throw error;
            }
        },
    },
});
