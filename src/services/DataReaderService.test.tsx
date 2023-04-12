import { describe, expect, test } from '@jest/globals';
import { DataReaderService } from './DataReaderService';

describe('DataReaderService', () => {
    const dataReaderService = new DataReaderService();

    test('to test seekCoincidences with a clue', () => {
        const result = dataReaderService.seekCoincidence('sink');
        expect(result.length).toBe(1);
        expect(result[0].code).toBe('SPUD90-X');
    });

    test('to test seekCoincidences with no clue', () => {
        expect(dataReaderService.seekCoincidence('').length).toBe(4);
    });

    test('to test seekCoincidences with a clue and no coincidences', () => {
        expect(dataReaderService.seekCoincidence('hey').length).toBe(0);
    });

    test('to test sort in ASC by code prop', () => {
        const allItems = dataReaderService.seekCoincidence('');
        const sortedData = dataReaderService.sort(allItems, 'code', true);
        expect(sortedData.length).toBe(4);
        expect(sortedData[0].code).toBe('HWR16-03');
        expect((sortedData[sortedData.length - 1]).code).toBe('UDASL-EC60-X');
    });

    test('to test sort in DESC by code prop', () => {
        const allItems = dataReaderService.seekCoincidence('');
        const sortedData = dataReaderService.sort(allItems, 'code', false);
        expect(sortedData.length).toBe(4);
        expect(sortedData[sortedData.length - 1].code).toBe('HWR16-03');
        expect((sortedData[0]).code).toBe('UDASL-EC60-X');
    });

    test('to test seekCoincidences and sort in ASC by price prop', () => {
        const items = dataReaderService.seekCoincidence('0-');
        const ascSortedData = dataReaderService.sort([...items], 'price', true);
        const descSortedData = dataReaderService.sort([...items], 'price', false);
        expect(items.length).toBe(3);
        expect(ascSortedData[0].code).toBe('UA80-X');
        expect(descSortedData[descSortedData.length - 1].code).toBe('UA80-X');
    })
});