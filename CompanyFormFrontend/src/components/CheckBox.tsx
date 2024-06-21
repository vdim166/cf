export const CheckBox = ({ classNameCol }: { classNameCol?: string }) => {
  return (
    <div className={"flex items-center " + classNameCol}>
      <input
        type="checkbox"
        id="no-agreement"
        name="no-agreement"
        className="mr-2"
      />
      <label htmlFor="no-agreement">Нет договора</label>
    </div>
  )
}
