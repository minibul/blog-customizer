import { useState, useRef, FormEvent, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<aside
			ref={sidebarRef}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>

				<Select
					title='Шрифт'
					selected={formState.fontFamilyOption}
					options={fontFamilyOptions}
					onChange={(option) =>
						setFormState({ ...formState, fontFamilyOption: option })
					}
				/>

			<RadioGroup
				name='radio'
				title='Размер шрифта'
				selected={formState.fontSizeOption}
				options={fontSizeOptions}
				onChange={(option) =>
					setFormState({ ...formState, fontSizeOption: option })
				}
			/>

				<Select
					title='Цвет шрифта'
					selected={formState.fontColor}
					options={fontColors}
					onChange={(option) =>
						setFormState({ ...formState, fontColor: option })
					}
				/>

				<Separator />

				<Select
					title='Цвет фона'
					selected={formState.backgroundColor}
					options={backgroundColors}
					onChange={(option) =>
						setFormState({ ...formState, backgroundColor: option })
					}
				/>

				<Select
					title='Ширина контента'
					selected={formState.contentWidth}
					options={contentWidthArr}
					onChange={(option) =>
						setFormState({ ...formState, contentWidth: option })
					}
				/>

				<div className={styles.bottomContainer}>
					<Button
						title='Сбросить'
						htmlType='reset'
						type='clear'
						onClick={handleReset}
					/>
					<Button title='Применить' htmlType='submit' type='apply' />
				</div>
			</form>
		</aside>
	);
};
