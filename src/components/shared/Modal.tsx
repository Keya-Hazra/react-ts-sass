import React from "react";
import Fade from "@material-ui/core/Fade/Fade";
import Modal from "@material-ui/core/Modal/Modal";

import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Backdrop from "@material-ui/core/Backdrop/Backdrop";
import CustomIcon from "../icons";
import { Theme } from "@material-ui/core/styles/createTheme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "2rem 1rem",
		},
	})
);

interface props {
	open: boolean;
	onClose: () => void;
	children: JSX.Element;
	title: string;
}

export const CustomModal: React.FC<props> = ({
	open,
	onClose,
	children,
	title,
}) => {
	const classes = useStyles();

	return (
		<Modal
			className={classes.modal}
			open={open}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			disableEnforceFocus
		>
			<Fade in={open}>
				<div className="bg-white rounded-3xl border focus:outline-none">
					<div className="w-auto p-8">
						<div className="flex justify-between items-center mb-6">
							<p className="font-medium text-2xl  py-4 text-CustomNavyBlue">
								{title}
							</p>
							<div
								className="cursor-pointer bg-white border border-gray-100 inline-block p-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out"
								onClick={onClose}
							>
								<CustomIcon
									name="cross"
									className="h-4 fill-current text-janttNavyBlue stroke-current stroke-1 "
								/>
							</div>
						</div>
						<div className="overflow-auto" style={{ maxHeight: "70vh" }}>
							{children}
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
};
