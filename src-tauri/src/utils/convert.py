def arrow_to_excel(arrow_batch, dest: str):
    import polars as pl
    batch = pl.from_arrow(arrow_batch)
    batch.write_excel(dest)

def excel_to_arrow(src: str):
    import polars as pl
    df = pl.read_excel(src)
    return df.to_arrow()
