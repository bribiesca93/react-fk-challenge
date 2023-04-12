import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { ServicesContext } from './index';
import { Container, InputContainer, ProductImg, Th } from './AppStyle';
import { IProductAttr, ISortInfo } from './interfaces/global-interfaces';

function App() {
    const { dataReaderService } = useContext(ServicesContext);
    const [clue, setClue] = useState('');
    const [sorterInfo, setSorterInfo] = useState([
        {
            prop: 'code',
            asc: false,
            active: false,
        },
        {
            prop: 'quantity',
            asc: false,
            active: false,
        },
        {
            prop: 'price',
            asc: false,
            active: false,
        },
        {
            prop: 'description',
            asc: false,
            active: false,
        },
    ] as ISortInfo[]);

    const [results, setResults] = useState([] as IProductAttr[]);

    const seekData = (clue: string) => {
        setClue(clue);
        setResults(dataReaderService.seekCoincidence(clue));
    }

    const sort = (prop: string) => {
        let isAsc = true;
        const newSorterInfo = sorterInfo.map(item => {
            const newItem = {...item};
            if(item.prop === prop) {
                newItem.asc = !newItem.asc;
                newItem.active = true;
                isAsc = newItem.asc;
            } else {
                newItem.active = false;
                newItem.asc = false;
            }

            return newItem;
        });

        setSorterInfo(newSorterInfo);
        setResults(dataReaderService.sort([...results], prop, isAsc));
    }

    const buildTitle = (item: ISortInfo) => {
        const postfix = item.active ? (item.asc ? '(ASC)' : '(DESC)') : '';
        return `${item.prop.charAt(0).toUpperCase()}${item.prop.slice(1)} ${postfix}`;
    }

    useEffect(() => {
        setResults(dataReaderService.seekCoincidence(clue));
    }, []);

    return (
        <Container>
            <InputContainer>
                <label>Filter </label>
                <input type="text" onChange={event => seekData(event.target.value)} value={clue} placeholder="Type in here to filter"/>
            </InputContainer>
            <div>
                { !results.length && <h2>There is no coincidences.</h2> }
                { !!results.length &&
                    <table border={2}>
                        <thead>
                        <tr>
                            {
                                sorterInfo.map(item => (
                                    <Th onClick={() => sort(item.prop)} style={{cursor: 'pointer'}}>{buildTitle(item)}</Th>
                                ))
                            }
                            <th>Picture</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(item => (
                            <tr key={item.position}>
                                <td>{item.code}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <ProductImg src={require(`./assets/img/${item.image}`)} style={{height: '150px', width: '150px'}}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </Container>
    );
}

export default App;
