import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Тесты кнопки', () => {
  test('Кнопка без текста', ()=>{
    render(<Button/>);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })

  test('Кнопка c текстом', ()=>{
    render(<Button text='текст кнопки'/>);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })

  test('Кнопка заблокированна', ()=>{
    render(<Button disabled={true}/>);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })

  test('Кнопка c индикацией загрузки', ()=>{
    render(<Button isLoader={true}/>);
    const btn = screen.getByRole('button');
    expect(btn).toMatchSnapshot();
  })

  test('Проверка вызова колбека', ()=>{
    const someFunction = jest.fn();
    render(<Button onClick={someFunction}/>);
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(someFunction).toBeCalledTimes(1);
  })
})
